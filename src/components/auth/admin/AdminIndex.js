import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";

class AdminIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: {},
      users: [],
      direction: {
        chapter_id: "asc"
      }
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

  componentWillMount() {
    const { user } = this.props.auth;
    if (!user.admin) {
      this.props.history.push("/profile");
    }

    if (user.admin) {
      axios
        .get("/users")
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch(err => {
          console.log(err);
        });
      axios
        .get("/profile")
        .then(res => {
          this.setState({ admin: res.data.user });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    let results;

    if (this.state.users.length !== 0) {
      results = (
        <table className="table table-striped table-sm table-hover text-center">
          <thead>
            <tr className="thead-red">
              <th>
                #{" "}
                <i
                  className="fas fa-chevron-down"
                  onClick={() => this.sortBy("id")}
                  style={{ cursor: "pointer" }}
                />
              </th>
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
            {this.state.users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.first_name} {user.last_name}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/chapters/${user.chapter_id}`}>
                      {user.chapter}
                    </Link>
                  </td>
                  <td>
                    <Moment format="D MMM YYYY" withTitle>
                      {user.joined}
                    </Moment>
                  </td>
                  <td>{user.organisation}</td>
                  <td>
                    <a href={`http://linkedin.com${user.linkedin_url}`}>
                      {user.linkedin_url}
                    </a>
                  </td>
                  <td>
                    <a href={`http://twitter.com${user.twitter_url}`}>
                      {user.twitter_url}
                    </a>
                  </td>
                  <td>{user.admin ? "Yes" : "No"}</td>
                  <td>{user.chapter_lead ? "Yes" : "No"}</td>
                  <td>{user.projects.length}</td>
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
          style={{ background: `url(${this.state.admin.banner_pic})` }}
        />
        <span className="jumbotron_h1 display-5 py-5 page-header">
          Wecome back, {this.state.admin.first_name}!
        </span>

        {results}
      </div>
    );
  }
}

// export default AdminIndex;

AdminIndex.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminIndex);
