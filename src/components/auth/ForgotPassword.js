import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"; // Helps redirecting
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authAction";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.email);
    this.props.resetPassword({ email: this.state.email });
    this.props.history.push("/waiting");
  }

  render() {
    return (
      <div className="container py-5">
        <form
          className="form-signin forgot-password col-sm-4 offset-sm-4 py-5"
          onSubmit={this.onSubmit}
        >
          <h1 className="h3 mb-3 font-weight-normal">Forgot your password?</h1>
          <div className="form-grou pt-5">
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control mb-5"
              placeholder="Email address"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              required
              autoFocus
            />
          </div>
          <button className="btn btn-lg btn-block" type="submit">
            Send reset email
          </button>
          <ul className="list-group mt-4">
            <li className="list-group-item">
              <Link to="/register">Join us</Link>
            </li>
            <li className="list-group-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(ForgotPassword));
