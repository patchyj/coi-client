import React, { Component } from 'react';
import Comment from './Comment.js';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  // Show nested comment textarea one at a time
  // every textarea is rendered with a show preoperty thats set to false by default
  // When the comment logo is clicked the textarea show property is toggled

  render() {
    let commentList = [];
    if (this.props.comments) {
      commentList = this.props.comments.map((comment, key) => {
        return <Comment auth={this.props.auth} comment={comment} key={key} />;
      });
    }

    return <div>{commentList}</div>;
  }
}

export default Comments;
