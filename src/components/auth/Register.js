import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "testy",
      last_name: "mctesterson",
      username: "jmcgregor",
      organisation: "sparta",
      profile_pic: "",
      banner_pic: "",
      chapter_id: 1,
      linkedin_url: "jmcgregor",
      twitter_url: "jmcgregor",
      email: "jmcgregor@spartaglobal.com",
      password: "password",
      password_confirmation: "password",
      errors: {},
      chapters: []
    };
    // this.state = {
    //   first_name: "",
    //   last_name: "",
    //   username: "",
    //   organisation: "",
    //   profile_pic: "",
    //   banner_pic: "",
    //   chapter_id: null,
    //   linkedin_url: "",
    //   twitter_url: "",
    //   email: "",
    //   password: "",
    //   password_confirmation: "",
    //   errors: {},
    //   chapters: []
    // };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillMount() {
    axios
      .get("/chapters")
      .then(res => {
        this.setState({
          chapters: res.data
        });
        // console.log(this.state);
      })
      .catch(err => {
        this.setState({
          errors: err
        });
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    // const { user } = this.state;

    const newUser = {
      user: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        username: this.state.username,
        organisation: this.state.organisation,
        profile_pic: this.state.profile_pic,
        banner_pic: this.state.banner_pic,
        chapter_id: parseInt(this.state.chapter_id),
        linkedin_url: this.state.linkedin_url,
        twitter_url: this.state.twitter_url,
        email: this.state.email,
        password: this.state.password
      }
    };

    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);
  }

  render() {
    const { errors, chapters } = this.state;

    return (
      <div className="container py-5">
        <form
          className="form-signin col-md-6 offset-md-3 col-sm-4 offset-sm-4 py-5"
          onSubmit={this.onSubmit}
        >
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <div className="form-group">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              required
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="First Name"
              required
              value={this.state.first_name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Last Name"
              required
              value={this.state.last_name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="organisation" className="sr-only">
              Organisation
            </label>
            <input
              type="text"
              name="organisation"
              className="form-control"
              placeholder="Organisation"
              required
              value={this.state.organisation}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={this.onChange}
              name="chapter_id"
            >
              <option default>Please choose your nearest chapter</option>
              {chapters.map((chapter, index) => {
                return (
                  <option key={index} value={chapter.id}>
                    {chapter.city}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-12">
            <div className="form-group row">
              <label htmlFor="url_label linkedin_url" className="col-md-5">
                http://linkedin.com/
              </label>
              <input
                type="text"
                name="linkedin_url"
                className="form-control col-md-6 offset-md-1"
                placeholder="LinkedIn"
                required
                value={this.state.linkedin_url}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group row">
              <label htmlFor="url_label twitter_url" className="col-md-5">
                http://twitter.com/
              </label>
              <input
                type="text"
                name="twitter_url"
                className="form-control col-md-6 offset-md-1"
                placeholder="handle"
                required
                value={this.state.twitter_url}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="profile_pic">Profile pic</label>
            <input
              type="file"
              className="form-control-file"
              name="profile_pic"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              required
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
              autoComplete="true"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation" className="sr-only">
              Password Confirmation
            </label>
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              placeholder="Password Confirmation"
              required
              autoComplete="true"
              value={this.state.password_confirmation}
              onChange={this.onChange}
            />
          </div>
          <button className="btn btn-main-submit" type="submit">
            Sign in
          </button>

          <ul className="list-group mt-4">
            <li className="list-group-item">
              <Link to="/login">Already a member? Sign in</Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
