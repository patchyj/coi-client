import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileAction";
import logo from "../../img/logo.png";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/profile">
            <i className="fas fa-user-circle" />
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );

    const userLinks = (
      <ul className="navbar-nav ml-auto">
        <Link className="nav-link text-white" to="/chapters">
          Chapters
        </Link>
        <Link className="nav-link text-white" to="/projects">
          Projects
        </Link>
        <Link className="nav-link text-white" to="/resources">
          Resources
        </Link>
        <Link className="nav-link text-white" to="/posts">
          Wall
        </Link>
      </ul>
    );

    const adminLinks = (
      <ul className="navbar-nav ml-auto">
        <Link className="nav-link text-white" to="/admin">
          Admin Panel
        </Link>
      </ul>
    );

    const leadLinks = (
      <ul className="navbar-nav ml-auto">
        <Link className="nav-link text-white" to="/lead">
          Lead Panel
        </Link>
      </ul>
    );

    return (
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <img
              className="img-responsive"
              src={logo}
              height="23px"
              alt="logo"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {isAuthenticated ? userLinks : ""}
            {user.admin ? adminLinks : ""}
            {user.chapter_lead ? leadLinks : ""}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
