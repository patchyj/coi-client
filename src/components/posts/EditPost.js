import React, { Component } from "react";
import { getPost, editPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class EditPost extends Component {
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
    const { match, history } = this.props;
    e.preventDefault();

    const updatedPost = {
      title: this.state.title,
      tagline: this.state.tagline,
      body: this.state.body,
      images: this.state.images,
      user_id: this.props.auth.user.user_id
    };

    this.props.editPost(updatedPost, match.params.id, history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
    axios
      .get(`/posts/${id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          title: res.data.title,
          tagline: res.data.tagline,
          body: res.data.body,
          images: res.data.images
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="editPost">
        <h1>Edit Post</h1>
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
                    value={this.state.title}
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
                    value={this.state.tagline}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="body"
                    className="form-control"
                    placeholder="Tell us something new"
                    onChange={this.onChange}
                    value={this.state.body}
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
