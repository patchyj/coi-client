import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'; // Helps redirecting
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/resources');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/resources');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form
                className="form-signin col-md-8 offset-md-2 col-sm-4 offset-sm-4 py-5 my-5"
                onSubmit={this.onSubmit}
              >
                <h1 className="display-5 mb-3 font-weight-normal text-center">
                  Welcome back
                </h1>
                <TextFieldGroup
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <button className="btn btn-main-submit" type="submit">
                  Sign in
                </button>
                <ul className="list-group mt-4">
                  <li className="list-group-item">
                    <Link to="/register" style={{ color: 'rgb(242,0,49)' }}>
                      Join us
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link
                      to="/forgot_password"
                      style={{ color: 'rgb(242,0,49)' }}
                    >
                      Forgot your password?
                    </Link>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));

// Hit the login route which gives us a token which is then stored in local storage. Then we send that token along with any request to access any private route
