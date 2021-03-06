import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    window.scrollTo(0, 0);
  }

  onDeleteClick(e) {
    const { id } = e.target;
    console.log(id);

    this.props.deletePost(id);
    window.location.reload();
  }

  render() {
    const { posts } = this.props.posts;
    const { user } = this.props.auth;
    let allPosts = [];

    if (posts.length !== 0) {
      allPosts = posts.map((post, index) => {
        let image;
        if (post.images) {
          image = <img className="img-fluid" src={post.images[0]} alt="" />;
        }
        return (
          <div
            key={index}
            className="row posts-row p-3 m-3 "
            style={{ position: 'relative' }}
          >
            <div className="col-8">
              <Link to={`/posts/${post._id}`}>
                <h4 className="display-5">{post.title}</h4>
              </Link>
              <p>{post.tagline}</p>
              <div className="media">
                <img
                  className="align-self-center mr-3"
                  src={post.user ? post.user.profilePic : ''}
                  alt=""
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
                <div className="media-body p-3">
                  <span className="">
                    <Link to={`/users/${post.user._id}`}>
                      {post.user.firstName} {post.user.lastName}
                    </Link>
                  </span>
                  <p className="text-muted my-2">
                    Posted{' '}
                    <Moment format="D MMM YYYY" withtitle="true">
                      {post.date}
                    </Moment>
                  </p>
                  <p className="">
                    <i className="text-muted far fa-comment-alt" />{' '}
                    {post.comments ? `${post.comments.length}` : ``}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <Link to={`/posts/${post._id}`}>{post.images ? image : ''}</Link>
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
        <div className="background-text container my-4">
          <h1 className="display-4">Wall</h1>
          <p className="p-responsive">
            Together we are stronger. Remember you are never alone as a Circle
            member; there are thousands of us around the world now! Please write
            about your experiences as a social intrapreneur, ask each other (and
            us) questions, meet each other (& us), share thoughts/ideas/comments
            and compliments as we all look to change the world together
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
                  <a
                    className="nav-link active"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/circleofyi?lang=en/"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/company/circle-of-young-intrapreneurs//"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/CircleOfYoungIntrapreneurs/"
                  >
                    <i className="fab fa-facebook" />
                  </a>
                  <a
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/thecircleofyi/?hl=en"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.eventbrite.com/o/circle-of-young-intrapreneurs-17921353432"
                  >
                    <svg
                      width="100"
                      height="36"
                      viewBox="0 0 200 36"
                      xmlns="http://www.w3.org/2000/svg"
                      data-reactid="25"
                      style={{
                        transform: 'translateX(-25px)'
                      }}
                    >
                      <g fill="none" fillRule="evenodd">
                        <g id="new-logo/orange" fill="rgb(221, 53, 69)">
                          <g id="logo/new" transform="translate(.347)">
                            <path
                              d="M185.945 17.513a6.657 6.657 0 0 1 6.878 2.584l-11.905 2.693c.411-2.52 2.333-4.668 5.027-5.277zm6.944 9.91a6.57 6.57 0 0 1-3.979 2.679c-2.711.614-5.417-.51-6.908-2.626l11.942-2.702 1.945-.44 3.719-.841a11.782 11.782 0 0 0-.31-2.372c-1.513-6.426-8.055-10.432-14.611-8.949-6.556 1.484-10.644 7.896-9.13 14.321 1.513 6.426 8.055 10.433 14.61 8.95 3.864-.875 6.869-3.46 8.377-6.751l-5.655-1.269z"
                              id="Fill-12"
                            />
                            <path
                              id="Fill-10"
                              d="M164.788 35.118V18.082h-3.677v-5.804h3.677V4.289h6.244v7.989h4.69v5.804h-4.69v17.036z"
                            />
                            <path
                              d="M152.86 35.118h6.03v-22.84h-6.03v22.84zm-.785-30.853c0-2.114 1.667-3.7 3.825-3.7 2.157 0 3.775 1.586 3.775 3.7 0 2.115-1.618 3.748-3.775 3.748-2.158 0-3.825-1.633-3.825-3.748z"
                              id="Fill-7"
                            />
                            <path
                              d="M150.76 12.342c-3.082.16-4.9.633-6.75 1.973v-2.037h-6.026v22.84h6.026v-11.2c0-3.524.86-5.529 6.75-5.726v-5.85z"
                              id="Fill-9"
                            />
                            <path
                              d="M117.16 24.057c.15 3.333 3.051 6.128 6.602 6.128 3.601 0 6.552-2.942 6.552-6.422 0-3.432-2.95-6.373-6.552-6.373-3.551 0-6.452 2.843-6.602 6.128v.539zm-5.88 11.061V1.38l6.03-1.364v13.962c1.863-1.49 4.07-2.115 6.472-2.115 6.864 0 12.355 5.286 12.355 11.918 0 6.583-5.491 11.965-12.355 11.965-2.403 0-4.609-.624-6.472-2.114v1.487h-6.03z"
                              id="Fill-5"
                            />
                            <path
                              id="Fill-1"
                              d="M98.445 35.118V17.965h-3.677v-5.687h3.677V4.283l6.244-1.413v9.408h4.69v5.687h-4.69v17.153z"
                            />
                            <path
                              d="M87.394 35.118V22.915c0-4.421-2.402-5.382-4.805-5.382-2.402 0-4.805.913-4.805 5.286v12.299h-6.03v-22.84h6.03v1.699c1.324-.961 2.942-2.115 6.13-2.115 5.098 0 9.51 2.932 9.51 10.092v13.164h-6.03z"
                              id="Fill-3"
                            />
                            <path
                              d="M56.484 17.513c2.694-.61 5.382.495 6.878 2.584L51.458 22.79c.41-2.52 2.332-4.668 5.026-5.277zm6.945 9.91a6.57 6.57 0 0 1-3.98 2.679 6.655 6.655 0 0 1-6.907-2.626l11.942-2.702 1.944-.44 3.72-.841a11.782 11.782 0 0 0-.31-2.372c-1.514-6.426-8.056-10.432-14.612-8.949-6.556 1.484-10.644 7.896-9.13 14.321 1.513 6.426 8.055 10.433 14.611 8.95 3.863-.875 6.868-3.46 8.376-6.751l-5.654-1.269z"
                              id="Fill-11"
                            />
                            <path
                              id="Fill-2"
                              d="M31.89 35.118l-9.364-22.84h6.57l5.932 15.49 5.982-15.49h6.57l-9.365 22.84z"
                            />
                            <path
                              d="M10.703 17.507c2.694-.61 5.382.495 6.878 2.584L5.677 22.785c.41-2.52 2.332-4.668 5.026-5.278zm6.945 9.91a6.57 6.57 0 0 1-3.98 2.68c-2.71.613-5.416-.51-6.907-2.626l11.942-2.702 1.945-.44 3.718-.842a11.782 11.782 0 0 0-.31-2.371c-1.513-6.426-8.055-10.433-14.61-8.95C2.888 13.65-1.2 20.063.314 26.489c1.514 6.426 8.055 10.432 14.611 8.949 3.864-.874 6.869-3.46 8.376-6.75l-5.654-1.27z"
                              id="Fill-13"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
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
