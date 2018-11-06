import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPost, addComment, deletePost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import Comments from "../comments/Comments";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentBody: "",
      comments: []
    };
  }
  componentWillMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentDidMount() {
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

  render() {
    const { post, comments } = this.props.posts;
    const { admin } = this.props.auth.user;

    let author, image;

    if (post.author) {
      author = (
        <Link to={`/users/${post.author.id}`}>
          {post.author.first_name} {post.author.last_name}
        </Link>
      );
    }

    const crudLinks = (
      <div className="py-2">
        <Link to={`/posts/${post.id}/edit`}>
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
      <div className="post container-fluid p-3">
        <div className="row p-5">
          <div className="col-6 p-2 text-right">
            <h1>{post.title}</h1>
            <h4 className="tagline">
              <span className="quote">"</span>
              {post.tagline}
            </h4>
            <div className="row">
              <div className="col-5 offset-2 text-left">
                <p>{post.author ? author : ""}</p>
              </div>
              <div className="col-5 text-right">
                <span className="text-muted">
                  <Moment format="HH:mm D MMM YYYY" withTitle>
                    {post.created_at}
                  </Moment>
                </span>
              </div>
            </div>
          </div>
          <div className="col-5">{post.images ? image : ""}</div>
          <div className="col-1">{admin ? crudLinks : ""}</div>
        </div>
        <div className="row p-5">
          <div className="col-8 offset-2">
            <p className="text-justify">{post.body}</p>
          </div>
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
