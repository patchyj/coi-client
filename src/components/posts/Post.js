import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPost, addComment, deletePost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import Comments from "../comments/Comments";
import { Editor, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentBody: "",
      comments: []
    };
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    window.scrollTo(0, 0);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newComment = {
      body: this.state.commentBody,
      post_id: this.props.posts.post.id,
      user_id: this.props.auth.user.user_id
    };
    this.props.addComment(newComment, this.props.history);
    // clear the form inputs
    e.target.reset();
    window.location.reload();
  }

  onDeleteClick(e) {
    const { id } = this.props.match.params;
    this.props.deletePost(id);
    this.props.history.push("/posts");
    window.location.reload();
  }

  createMarkup(html) {
    return { __html: html };
  }

  render() {
    const { post, comments } = this.props.posts;
    const { admin } = this.props.auth.user;

    let user, image;
    let contentState;

    if (Object.keys(post).length > 0) {
      contentState = stateToHTML(convertFromRaw(JSON.parse(post.body)));
    }

    if (post.user) {
      user = (
        <Link to={`/users/${post.user._id}`}>
          {post.user.firstName} {post.user.lastName}
        </Link>
      );
    }

    const crudLinks = (
      <div className="py-2">
        <Link to={`/posts/${post._id}/edit`}>
          <i className="fas fa-edit" />
        </Link>
        <br />
        <i onClick={this.onDeleteClick.bind(this)} className="fas fa-times" />
      </div>
    );

    if (post.images) {
      image = <img className="img-fluid" src={post.images[0]} alt="" />;
    }
    return (
      <div className="post container p-3">
        <div className="row p-5">
          <div className="col-md-6 p-2 text-right">
            <h1>{post.title}</h1>
            <h4 className="tagline">
              <span className="quote">"</span>
              {post.tagline}
            </h4>
            <div className="row">
              <div className="col-5 offset-2 text-left">
                <p>{post.user ? user : ""}</p>
              </div>
              <div className="col-5 text-right">
                <span className="text-muted">
                  <Moment format="HH:mm D MMM YYYY" withtitle="true">
                    {post.created_at}
                  </Moment>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-sm-12">{post.images ? image : ""}</div>
          <div className="col-md-1 col-sm-12">{admin ? crudLinks : ""}</div>
        </div>
        <div className="row p-5">
          {contentState ? (
            <div
              dangerouslySetInnerHTML={this.createMarkup(contentState)}
              style={{ maxWidth: "100%" }}
            />
          ) : (
            <div className="spinner" />
          )}
        </div>
        <div className="container comments">
          <div className="row p-5">
            <div className="col-7 offset-2">
              <h5 className="">Leave a comment</h5>
              <form className="py-3" onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group-row">
                  <textarea
                    className="form-action"
                    name="commentBody"
                    rows="2"
                    value={this.state.currentBody}
                    onChange={this.onChange.bind(this)}
                  />
                  <input type="submit" value="Submit" className="ml-auto" />
                </div>
              </form>
              <Comments comments={comments} auth={this.props.auth} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth,
  comments: state.comments
});

export default connect(
  mapStateToProps,
  {
    getPost,
    addComment,
    deletePost
  }
)(Post);
