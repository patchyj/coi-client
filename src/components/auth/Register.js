import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import termsOfUse from '../../img/Terms of Use.pdf';
import privacyPolicy from '../../img/Privacy Policy.pdf';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      organisation: '',
      profilePic: '',
      bannerPic: '',
      chapter: '',
      linkedinUrl: '',
      twitterUrl: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      chapters: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/chapters')
      .then(chapters => {
        this.setState({ chapters: chapters.data });
      })
      .catch(err => this.setState({ errors: err }));
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/resources');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      organisation: this.state.organisation,
      profilePic: this.state.profilePic,
      bannerPic: this.state.bannerPic,
      chapter: this.state.chapter,
      linkedinUrl: this.state.linkedinUrl,
      twitterUrl: this.state.twitterUrl,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Action
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors, chapters } = this.state;

    let fillChapters;
    if (chapters.length !== 0) {
      fillChapters = chapters;
    } else {
      fillChapters = [{ city: 'null', id: null }];
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form
                className="form-signin col-md-10 offset-md-1 col-sm-8 offset-sm-2 py-5"
                onSubmit={this.onSubmit}
              >
                <h1 className="display-5 mb-3 font-weight-normal text-center">
                  Register
                </h1>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <TextFieldGroup
                  placeholder="First name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  error={errors.firstName}
                />
                <TextFieldGroup
                  placeholder="Last name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                />
                <TextFieldGroup
                  placeholder="Organisation"
                  name="organisation"
                  value={this.state.organisation}
                  onChange={this.onChange}
                  error={errors.organisation}
                />
                <SelectListGroup
                  placeholder="Please choose your nearest circle chapter"
                  name="chapter"
                  value={this.state.chapter}
                  onChange={this.onChange}
                  error={errors.chapter}
                  options={fillChapters}
                />
                <TextFieldGroup
                  placeholder="Full Twitter URL"
                  name="twitterUrl"
                  value={this.state.twitterUrl}
                  onChange={this.onChange}
                  error={errors.twitterUrl}
                  optional
                />
                <TextFieldGroup
                  placeholder="Full LinkedIn URL"
                  name="linkedinUrl"
                  value={this.state.linkedinUrl}
                  onChange={this.onChange}
                  error={errors.linkedinUrl}
                  optional
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <p className="text-muted my-4">
                  By click Register, you agree to the{' '}
                  <a href={termsOfUse} download>
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href={privacyPolicy} download>
                    Privacy Policy
                  </a>
                </p>
                <button className="btn btn-main-submit" type="submit">
                  Register
                </button>

                <ul className="list-group mt-4">
                  <li className="list-group-item">
                    <Link to="/login" style={{ color: 'rgb(242,0,49)' }}>
                      Already a member? Sign in
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

// As soon as you click submit it'll call registerUser (action), dispatch to our reducer then fill our user object. We mapped are authState to a property in this component which should display the name

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // Comes from RootReducer
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
