import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      projects: [],
      errors: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios
      .get(`/api/users/${id}`)
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        this.setState({
          errors: err
        });
      });
    axios
      .get(`/api/users/${id}/projects`)
      .then(res => {
        this.setState({
          projects: res.data
        });
      })
      .catch(err => {
        this.setState({
          errors: err
        });
      });
    window.scrollTo(0, 0);
  }

  render() {
    if (this.state.user) {
      const {
        firstName,
        lastName,
        organisation,
        email,
        username,
        chapter,
        chapterLead,
        linkedinUrl,
        twitterUrl,
        bannerPic,
        profilePic,
        joined,
        projects,
        bio,
        tagline,
        date
      } = this.state.user;

      const jumotronStyle = {
        background: `url(${bannerPic})`
      };

      let projectList;

      if (this.state.projects.length !== 0) {
        projectList = (
          <table className="table table-striped table-sm table-hover text-center">
            <thead>
              <tr className="thead-red">
                <th>Title</th>
                <th>Posted</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map((project, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link to={`/projects/${project.id}`}>
                        {project.title}
                      </Link>
                    </td>
                    <td>
                      <Moment format="D MMM YYYY" withtitle="true">
                        {project.date}
                      </Moment>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      } else {
        projectList = <div className="spinner" />;
      }

      return (
        <div className="users">
          <div className="jumbotron" style={jumotronStyle}>
            <div className="main-text">
              <h1 className="display-3">
                {firstName} {lastName}
              </h1>
              <h5 className="py-3 tagline">{tagline}</h5>
              <h3 className="">
                Member since{" "}
                <Moment format="D MMM YYYY" withtitle="true">
                  {date}
                </Moment>
              </h3>
              <div className="">
                <a href={`http://twitter.com/${twitterUrl}`} target="_blank">
                  <i className="fab fa-twitter" />
                </a>
                <a href={`http://linkedin.com${linkedinUrl}`} target="_blank">
                  <i className="fab fa-linkedin" />
                </a>
                <a href={`mailto:${email}`} target="_blank">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
          <div className="jumbotron bg-main-red">
            <div className="row text-center">
              <div className="col-md-4">
                <img src={profilePic} alt="" className="profile_pic" />
              </div>
              <div className="col-md-6">
                <p className="user-bio">{bio}</p>
              </div>
            </div>
          </div>
          <div className="jumbotron text-center">
            {this.state.projects.length !== 0
              ? projectList
              : "No projects proposed"}
          </div>
        </div>
      );
    } else {
      return <div className="spinner" />;
    }
  }
}

export default User;
