import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import NestedComment from "./NestedComment.js";
import axios from "axios";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      body: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  toggleComment(e) {
    this.setState({
      show: !this.state.show
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newSubcomment = {
      body: this.state.body,
      comment_id: this.props.comment.id,
      user_id: this.props.auth.user.user_id
    };

    axios
      .post(`/subcomment`, newSubcomment)
      .then(res => window.location.reload())
      .catch(errors => this.setState({ errors }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // debugger;
    const { comment, auth } = this.props;
    const { user } = comment;

    const addComment = (
      <form
        className="py-3"
        style={{ width: "100%" }}
        onSubmit={this.onSubmit.bind(this)}
      >
        <div className="form-group-row">
          <textarea
            className="form-action"
            rows="2"
            name="body"
            value={this.state.body}
            onChange={this.onChange}
          />
          <input type="submit" value="Submit" className="ml-auto" />
        </div>
      </form>
    );

    const subCommentList = comment.comments
      .map((comment, key) => {
        return <NestedComment comment={comment} key={key} />;
      })
      .reverse();

    return (
      <div className="media p-1 m-2" style={{ fontSize: "14px" }}>
        <Link to={`/users/${comment.user.id}`}>
          <img
            className="align-self-start mr-3"
            src={comment.user.profile_pic}
            alt=""
            style={{ width: "40px" }}
          />
        </Link>
        <div className="media-body">
          <div className="row">
            <div className="col-10">
              {comment.body} <br />
            </div>
            <div className="col-6">
              <Link to={`/users/${comment.user.id}`}>
                {comment.user.first_name} {comment.user.last_name}
              </Link>
            </div>
            <div className="col-6 text-right">
              <span className="text-muted">
                <Moment format="HH:mm D MMM YYYY" withtitle="true">
                  {comment.created_at}
                </Moment>
              </span>
            </div>
          </div>
          <div className="row">{this.state.show ? addComment : ""}</div>
          {subCommentList}
        </div>
        <small className="text-muted">
          <i
            className="far fa-comment-alt"
            onClick={this.toggleComment.bind(this)}
          />
        </small>
      </div>
    );
  }
}

export default Comment;
