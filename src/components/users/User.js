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
      .get(`/users/${id}`)
      .then(res => {
        this.setState({
          user: res.data,
          projects: res.data.projects
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
    const {
      first_name,
      last_name,
      organisation,
      email,
      username,
      chapter,
      chapter_lead,
      linkedin_url,
      twitter_url,
      banner_pic,
      profile_pic,
      joined,
      projects,
      bio,
      tagline,
      updated_at
    } = this.state.user;

    const jumotronStyle = {
      background: `url(${banner_pic})`
    };

    const projectList = (
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
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </td>
                <td>
                  <Moment format="D MMM YYYY" withTitle>
                    {project.created_at}
                  </Moment>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    return (
      <div className="users">
        <div className="jumbotron" style={jumotronStyle}>
          <div className="main-text">
            <h1 className="display-3">
              {first_name} {last_name}
            </h1>
            <h5 className="py-3 tagline">{tagline}</h5>
            <h3 className="">
              Member since{" "}
              <Moment format="D MMM YYYY" withTitle>
                {updated_at}
              </Moment>
            </h3>
            <div className="">
              <a href={`http://twitter.com/${twitter_url}`} target="_blank">
                <i className="fab fa-twitter" />
              </a>
              <a href={`http://linkedin.com${linkedin_url}`} target="_blank">
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
              <img src={profile_pic} alt="" className="profile_pic" />
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
  }
}

export default User;
