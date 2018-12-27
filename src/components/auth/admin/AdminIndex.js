import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUsers,
  getCurrentUser,
  setAdmin,
  setLead
} from "../../../actions/authAction";
import { getProjects } from "../../../actions/projectActions";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";

const AdminCheckBox = ({ role, onChange, name, id }) => {
  let adminInput;
  if (role === "admin") {
    adminInput = (
      <input
        role={role}
        type="checkbox"
        aria-label="Checkbox for following text input"
        defaultChecked={true}
        onChange={onChange}
        name={name}
        id={id}
      />
    );
  } else {
    adminInput = (
      <input
        role={role}
        type="checkbox"
        aria-label="Checkbox for following text input"
        defaultChecked={false}
        onChange={onChange}
        name={name}
        id={id}
      />
    );
  }
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">{adminInput}</div>
      </div>
    </div>
  );
};

const LeadCheckBox = ({ role, onChange, dataName, id, city }) => {
  let leadInput;
  if (role === "lead") {
    leadInput = (
      <input
        id={id}
        role={role}
        type="checkbox"
        aria-label="Checkbox for following text input"
        defaultChecked={true}
        onChange={onChange}
        data-name={dataName}
        data-city={city}
      />
    );
  } else {
    leadInput = (
      <input
        id={id}
        role={role}
        type="checkbox"
        aria-label="Checkbox for following text input"
        defaultChecked={false}
        onChange={onChange}
        data-name={dataName}
        data-city={city}
      />
    );
  }
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">{leadInput}</div>
      </div>
    </div>
  );
};

class AdminIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: {},
      users: [],
      direction: {
        chapter_id: "asc"
      },
      isAdmin: false
    };

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(key) {
    this.setState({
      users: this.state.users.sort((a, b) =>
        this.state.direction[key] === "asc"
          ? parseInt(a[key], 10) - parseInt(b[key], 10)
          : parseInt(b[key], 10) - parseInt(a[key], 10)
      ),
      direction: {
        [key]: this.state.direction[key] === "asc" ? "des" : "asc"
      }
    });
  }

  setAdminClick(e) {
    const role = e.target.attributes.role.value;
    if (role === "admin") {
      const res = window.confirm(
        `Are you sure you want to remove ${
          e.target.attributes.name.value
        }'s admin priveleges?'`
      );
      if (res) {
        this.props.setAdmin(e.target.id, this.props.history);
        // window.location.reload();
      } else {
        // window.location.reload();
      }
    } else {
      const res = window.confirm(
        `Are you sure you want to make ${
          e.target.attributes.name.value
        } an admin?`
      );
      if (res) {
        this.props.setAdmin(e.target.id, this.props.history);
        // window.location.reload();
      } else {
        // window.location.reload();
      }
    }
  }

  setLeadClick(e) {
    console.log(e.target.attributes);
    const role = e.target.attributes.role.value;
    if (role === "lead") {
      const res = window.confirm(
        `Are you sure you want to remove ${
          e.target.attributes["data-name"].value
        } as a lead of ${e.target.attributes["data-city"].value}?'`
      );
      if (res) {
        this.props.setLead(e.target.id, this.props.history);
        // window.location.reload();
      } else {
        // window.location.reload();
      }
    } else {
      const res = window.confirm(
        `Are you sure you want to make ${
          e.target.attributes["data-name"].value
        } a lead of ${e.target.attributes["data-city"].value}?`
      );
      if (res) {
        this.props.setLead(e.target.id, this.props.history);
        // window.location.reload();
      } else {
        // window.location.reload();
      }
    }
  }

  componentDidMount() {
    const { user } = this.props.auth;
    if (!user.admin) {
      this.props.history.push("/profile");
    }

    if (user.admin) {
      this.props.getUsers();
      this.props.getProjects();
      this.props.getCurrentUser();
    }
  }

  render() {
    let results;
    const { users } = this.props.auth;
    const { projects } = this.props.projects;

    if (users.length !== 0 && projects.length !== 0) {
      results = (
        <table className="table table-sm table-hover text-center">
          <thead>
            <tr className="thead-red">
              <th>Member</th>
              <th>Email</th>
              <th>
                Chapter{" "}
                <i
                  className="fas fa-chevron-down"
                  onClick={() => this.sortBy("chapter_id")}
                  style={{ cursor: "pointer" }}
                />
              </th>
              <th>Joined</th>
              <th>Organisation</th>
              <th>LinkedIn</th>
              <th>Twitter</th>
              <th>Admin?</th>
              <th>Lead?</th>
              <th>Projects</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              let userProjects = [];
              projects.forEach(project => {
                if (project.user._id === user._id) {
                  userProjects.push(project);
                }
              });

              return (
                <tr key={i}>
                  <td>
                    <Link to={`/users/${user._id}`}>
                      {user.firstName} {user.lastName}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/chapters/${user.chapter ? user.chapter._id : ""}`}
                    >
                      {`${user.chapter ? user.chapter.city : ""}`}
                    </Link>
                  </td>
                  <td>
                    <Moment format="D MMM YYYY" withtitle="true">
                      {user.joined}
                    </Moment>
                  </td>
                  <td>{user.organisation}</td>
                  <td>
                    {user.linkedinUrl ? (
                      <a href={`http://linkedin.com${user.linkedinUrl}`}>
                        <i className="fab fa-linkedin" />
                      </a>
                    ) : (
                      <i
                        className="fab fa-linkedin"
                        style={{ color: "#aaa" }}
                      />
                    )}
                  </td>
                  <td>
                    {user.twitterUrl ? (
                      <a href={`http://twitter.com${user.twitterUrl}`}>
                        <i className="fab fa-twitter" />
                      </a>
                    ) : (
                      <i className="fab fa-twitter" style={{ color: "#aaa" }} />
                    )}
                  </td>
                  <td>
                    {user.admin ? (
                      <AdminCheckBox
                        role="admin"
                        onChange={this.setAdminClick.bind(this)}
                        name={`${user.firstName} ${user.lastName}`}
                        id={user._id}
                      />
                    ) : (
                      <AdminCheckBox
                        role="user"
                        onChange={this.setAdminClick.bind(this)}
                        name={`${user.firstName} ${user.lastName}`}
                        id={user._id}
                      />
                    )}
                  </td>
                  <td>
                    {user.lead ? (
                      <LeadCheckBox
                        role="lead"
                        onChange={this.setLeadClick.bind(this)}
                        dataName={`${user.firstName} ${user.lastName}`}
                        id={user._id}
                        city={user.chapter ? user.chapter.city : ""}
                      />
                    ) : (
                      <LeadCheckBox
                        role="user"
                        onChange={this.setLeadClick.bind(this)}
                        dataName={`${user.firstName} ${user.lastName}`}
                        id={user._id}
                        city={user.chapter ? user.chapter.city : ""}
                      />
                    )}
                  </td>
                  <td>{userProjects.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      results = <div className="spinner" />;
    }
    return (
      <div className="admin">
        <div
          className="jumbotron"
          style={{ background: `url(${this.props.auth.user.bannerPic})` }}
        />
        <span className="jumbotron_h1 display-5 py-5 page-header">
          Wecome back, {this.props.auth.user.firstName}!
        </span>

        {results}
      </div>
    );
  }
}

// export default AdminIndex;

AdminIndex.propTypes = {
  auth: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getProjects: PropTypes.func.isRequired,
  setAdmin: PropTypes.func.isRequired,
  setLead: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});

export default connect(
  mapStateToProps,
  { getUsers, getCurrentUser, setAdmin, setLead, getProjects }
)(AdminIndex);
