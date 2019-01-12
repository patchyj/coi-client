import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPost, addComment, deletePost } from '../../actions/postActions';
import { getCurrentUser } from '../../actions/authAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Comments from '../comments/Comments';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import TestAreaFieldGroup from '../common/TextAreaFieldGroup';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentBody: '',
      firstName: '',
      lastName: '',
      profilePic: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    axios
      .get(`/api/users/${this.props.auth.user.id}/comment`)
      .then(res => {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          profilePic: res.data.profilePic
        });
      })
      .catch(err => this.setState({ errors: err }));

    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { comments } = this.props.posts.post;
    if (comments) {
      if (nextProps.posts.comments.length > comments.length) {
        this.setState({ commentBody: '' });
        this.props.getPost(this.props.match.params.id);
      }
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newComment = {
      body: this.state.commentBody,
      post: this.props.posts.post._id,
      user: this.props.auth.user.id,
      authorName: `${this.state.firstName} ${this.state.lastName}`,
      profilePic: this.state.profilePic
    };

    this.props.addComment(newComment, this.props.history);
  }

  onDeleteClick(e) {
    const { id } = this.props.match.params;
    this.props.deletePost(id);
    this.props.history.push('/posts');
    window.location.reload();
  }

  render() {
    const { post, comments } = this.props.posts;
    const { admin } = this.props.auth.user;
    const { errors } = this.state;

    let user, image;

    if (post.user) {
      user = (
        <Link to={`/users/${post.user._id}`}>
          {post.user.firstName} {post.user.lastName}
        </Link>
      );
    }

    const crudLinks = (
      <div className="py-2" style={{ position: 'absolute' }}>
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

    let modules = {
      toolbar: false
    };

    return (
      <div className="post container p-3">
        <div className="row py-5">
          <div className="col-md-6 py-2 text-right">
            <h1>{post.title}</h1>
            <h4 className="tagline">
              <span className="quote">"</span>
              {post.tagline}
            </h4>
            <div className="row">
              <div className="col-5 offset-2 text-left">
                <p>{post.user ? user : ''}</p>
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
          <div className="col-md-5 col-sm-12">{post.images ? image : ''}</div>
          <div className="col-md-1 col-sm-12">{admin ? crudLinks : ''}</div>
        </div>
        <div className="row py-5">
          <ReactQuill
            value={post.body || ''}
            readOnly={true}
            modules={modules}
          />
        </div>
        <div className="container comments">
          <div className="row py-5">
            <div className="col-md-7 offset-md-2 col-sm-12">
              <h5 className="">Leave a comment</h5>
              <form className="py-3" onSubmit={this.onSubmit.bind(this)}>
                <TestAreaFieldGroup
                  name="commentBody"
                  rows="2"
                  value={this.state.commentBody}
                  onChange={this.onChange.bind(this)}
                  error={errors.body}
                  button={
                    <input
                      type="submit"
                      value="Submit"
                      className="ml-auto col-2"
                    />
                  }
                />
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
  getCurrentUser: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth,
  comments: state.comments,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getPost,
    addComment,
    deletePost,
    getCurrentUser
  }
)(Post);

// <div className="form-group-row">
// <textarea
//   className="form-action"
//   name="commentBody"
//   rows="2"
//   value={this.state.commentBody}
//   onChange={this.onChange.bind(this)}
// />
// <input type="submit" value="Submit" className="ml-auto" />
// </div>
// {errors ? (
// <div className="invalid-feedback">{errors.body}</div>
// ) : (
// ''
// )}
