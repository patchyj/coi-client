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
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
