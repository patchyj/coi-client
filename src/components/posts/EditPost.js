import React, { Component } from "react";
import { getPost, editPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      tagline: "",
      images: [],
      body: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { match, history } = this.props;
    e.preventDefault();

    const updatedPost = {
      title: this.state.title,
      tagline: this.state.tagline,
      body: this.state.body,
      images: this.state.images
    };

    this.props.editPost(updatedPost, match.params.id, history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeBody(value) {
    this.setState({ body: value });
  }

  addPhoto(e) {
    var formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("name", "test");

    axios
      .post("/api/posts/files", formData)
      .then(res => {
        let arr = [];
        arr.push(res.data.url);
        console.log(arr);
        this.setState({ images: arr });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }

  render() {
    const { post, comments } = this.props.posts;

    return (
      <div className="editPost">
        <div className="jumbotron-fluid">
          <div className="container">
            <h1 className="display-5 py-5 text-center">Edit Post</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter a title for your post"
                    onChange={this.onChange}
                    defaultValue={post.title}
                  />
                </div>
                <div className="form-group">
                  <label>Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    className="form-control"
                    placeholder="Give your post a tagline"
                    onChange={this.onChange}
                    defaultValue={post.tagline}
                  />
                </div>

                <div className="form-group">
                  <ReactQuill
                    className=""
                    value={post.body}
                    onChange={this.onChangeBody}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Upload an image (not working yet)</label>
                  <input type="file" className="form-control-file" />
                </div>

                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
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
    editPost
  }
)(EditPost);
