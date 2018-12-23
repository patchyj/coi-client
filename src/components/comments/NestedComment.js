import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class NestedComment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="">
        <div className="media p-1 m-2" style={{ fontSize: "14px" }}>
          <Link to={`/users/${comment.user.id}`}>
            <img
              className="align-self-start mr-3"
              src={comment.user.profile_pic}
              alt="user profile"
              style={{ width: "40px" }}
            />
          </Link>
          <div className="media-body">
            <div className="row">
              <div className="col-12">
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
          </div>
        </div>
      </div>
    );
  }
}

export default NestedComment;
