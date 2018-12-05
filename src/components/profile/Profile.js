import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
// Actions
import { setUser } from "../../actions/authActions";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    if (!localStorage.token) {
      window.location.href = "/login";
    }
  }

  componentDidMount() {
    axios({
      url: "/profile",
      method: "get"
    })
      .then(res => {
        this.setState({ user: res.data.user });
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      email,
      username,
      first_name,
      last_name,
      organisation,
      chapter_lead,
      admin,
      twitter_url,
      linkedin_url,
      banner_pic,
      profile_pic,
      tagline,
      bio,
      updated_at
    } = this.state.user;

    return (
      <div className="dashboard container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card m-3">
              <img
                className="card-img-top banner_pic"
                src={banner_pic}
                alt=""
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="profile_pic_container">
                <img
                  className="img-responsive profile_pic"
                  src={profile_pic}
                  alt=""
                />
              </div>
              <div className="card-body">
                <h1 className="card-title">
                  {first_name} {last_name}
                </h1>
                <h2>{organisation}</h2>
                <h3>{admin ? "Role : Admin" : ""}</h3>
                <h3>{chapter_lead ? "Role : Chapter Lead" : ""}</h3>
                <div className="social">
                  <a href={`http://twitter.com/${twitter_url}`}>
                    <i className="fab fa-twitter" />{" "}
                  </a>
                  <a href={`http://linkedin.com/${linkedin_url}`}>
                    <i className="fab fa-linkedin-in" />{" "}
                  </a>
                </div>
                <h5 className="card-text">{tagline}</h5>
                <p className="card-text">{bio}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Last updated <Moment fromNow>{updated_at}</Moment>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Profile.propTypes = {
//   setUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };
//
// const mapStateToProps = state => ({
//   auth: state.auth
// });
//
// export default connect(
//   mapStateToProps,
//   { setUser }
// )(Profile);

export default Profile;
