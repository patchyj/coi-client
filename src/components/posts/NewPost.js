import React, { Component } from "react";
import { createPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      tagline: "",
      images: [],
      body: "",
      ready: true,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      tagline: this.state.tagline,
      body: this.state.body,
      images: this.state.images,
      user: this.props.auth.user.id
    };

    this.props.createPost(newPost, this.props.history);
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
    this.setState({ ready: false });

    axios
      .post("/api/posts/files", formData)
      .then(res => {
        let arr = [];
        arr.push(res.data.url);
        this.setState({ images: arr, ready: true });
      })
      .catch(errors => this.setState({ errors }));
  }

  render() {
    return (
      <div className="newPost">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-4">New Post</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form onSubmit={this.onSubmit} type="multipart/form-data">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter a title for your post"
                    onChange={this.onChange}
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
                  />
                </div>
                <div className="form-group">
                  <ReactQuill
                    value={this.state.body}
                    onChange={this.onChangeBody}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Upload an image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="image"
                    onChange={this.addPhoto}
                  />
                </div>
                {this.state.ready ? (
                  <input type="submit" value="Submit" />
                ) : (
                  <input type="submit" value="Uploading..." disabled />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewPost.propTypes = {
  posts: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    createPost
  }
)(NewPost);
