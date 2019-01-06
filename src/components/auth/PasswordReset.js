import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValidToken: null,
      errors: {},
      password: "",
      password2: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    axios
      .get(`/api/users/reset/${token}`)
      .then(res => {
        if (res.data) {
          this.setState({ isValidToken: true });
        } else {
          this.setState({ isValidToken: false });
        }
      })
      .catch(err => {
        this.setState({ isValidToken: false, errors: err });
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { token } = this.props.match.params;

    const password = {
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post(`/api/users/reset/${token}`, password)
      .then(res => this.props.history.push("/login"))
      .catch(err => this.setState({ errors: err }));
  }

  render() {
    const { isValidToken } = this.state;

    let display;

    if (isValidToken === null) {
      display = <div className="spinner" />;
    } else if (isValidToken === false) {
      display = (
        <div className="row">
          <div className="col-md-6 offset-md-3 py-5 text-center">
            <h1 className="display-5 py-5">
              Password reset token is invalid or has expired
            </h1>
          </div>
        </div>
      );
    } else {
      display = (
        <form
          className="form-signin col-sm-4 offset-sm-4 py-5"
          onSubmit={this.onSubmit}
        >
          <h1 className="h3 mb-3 font-weight-normal">Reset your password</h1>
          <div className="form-group">
            <label htmlFor="inputEmail" className="sr-only">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your new password"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail" className="sr-only">
              Password Confirmation
            </label>
            <input
              type="password"
              name="password2"
              className="form-control"
              placeholder="Retype your new password"
              value={this.state.password2}
              onChange={this.onChange}
              required
            />
          </div>
          <button
            className="btn btn-lg btn-block btn-main-submit"
            type="submit"
          >
            Sign in
          </button>

          <ul className="list-group mt-4">
            <li className="list-group-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </form>
      );
    }
    return <div className="container py-5">{display}</div>;
  }
}

export default PasswordReset;
