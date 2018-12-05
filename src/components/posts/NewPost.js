import React, { Component } from "react";
import { createPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RichTextEditor from "../common/RichTextEditor.js";

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      tagline: "",
      body: "",
      images: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      tagline: this.state.tagline,
      body: this.state.body,
      images: this.state.images,
      user_id: this.props.auth.user.user_id
    };

    this.props.createPost(newPost, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="newPost">
        <div className="jumbotron">
          <h1 className="display-4">New Post</h1>
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
                  <textarea
                    type="text"
                    name="body"
                    className="form-control"
                    placeholder="Tell us something new"
                    onChange={this.onChange}
                  />
                  <RichTextEditor />
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

NewPost.propTypes = {
  posts: PropTypes.object.isRequired
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
