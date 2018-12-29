import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { TwitterTimelineEmbed } from "react-twitter-embed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    window.scrollTo(0, 0);
  }

  render() {
    const { posts } = this.props.posts;
    let allPosts = [];

    if (posts.length !== 0) {
      allPosts = posts.map((post, index) => {
        let image;
        if (post.images) {
          image = <img className="img-fluid" src={post.images[0]} alt="" />;
        }
        return (
          <div key={index} className="row posts-row p-3 m-3 ">
            <div className="col-8">
              <Link to={`/posts/${post._id}`}>
                <h4 className="display-5">{post.title}</h4>
              </Link>
              <p>{post.tagline}</p>
              <div className="media">
                <img
                  className="align-self-center mr-3"
                  src={post.user ? post.user.profilePic : ""}
                  alt=""
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
                <div className="media-body p-3">
                  <span className="">
                    <Link to={`/users/${post.user._id}`}>
                      {post.user.firstName} {post.user.lastName}
                    </Link>
                  </span>
                  <p className="text-muted my-2">
                    Posted{" "}
                    <Moment format="D MMM YYYY" withtitle="true">
                      {post.created_at}
                    </Moment>
                  </p>
                  <p className="">
                    <i className="text-muted far fa-comment-alt" />{" "}
                    {post.comments ? `${post.comments.length}` : ``}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <Link to={`/posts/${post.id}`}>{post.images ? image : ""}</Link>
            </div>
          </div>
        );
      });
      // .reverse();
    } else {
      allPosts = <div className="spinner" />;
    }

    return (
      <div className="posts">
        <div className="background" />
        <div className="background-text">
          <h1 className="display-4">Posts</h1>
          <p className="p-responsive">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="container-fluid">
          <div className="jumbotron">
            <h6 className="display-4-5 p-5">
              <Link to="/posts/new">Have something to share?</Link>
            </h6>
          </div>
          <div className="row posts-row p-3 m-3">
            <div className="col-md-3 col-sm-12">
              <div className="sidenav" style={{ padding: 0 }}>
                <TwitterTimelineEmbed
                  sourceType="URL"
                  screenName="circleofyi"
                  options={{ height: 800 }}
                />
              </div>
            </div>
            <div className="col-md-8 col-sm-12">{allPosts}</div>
            <div className="col-md-1 col-sm-12">
              <div className="sidenav">
                <nav className="nav flex-column">
                  <a className="nav-link active" target="_blank" href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="nav-link" target="_blank" href="#">
                    <i className="fab fa-linkedin" />
                  </a>
                  <a className="nav-link" target="_blank" href="#">
                    <i className="fab fa-facebook" />
                  </a>
                  <a className="nav-link" target="_blank" href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(Posts);
