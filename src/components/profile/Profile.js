import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';

// Actions
import { getCurrentUser, updateUser } from '../../actions/authAction';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      organisation: '',
      linkedinUrl: '',
      twitterUrl: '',
      tagline: '',
      profilePic: '',
      bannerPic: '',
      bio: '',
      chapter: {},
      errors: {},
      user: {},
      ready: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }

  addPhoto(e, imageType) {
    var formData = new FormData();

    formData.append('file', e.target.files[0]);
    formData.append('name', 'test');
    this.setState({ ready: false });

    axios
      .post('/api/posts/files', formData)
      .then(res => {
        this.setState({ [imageType]: res.data.url, ready: true });
      })
      .catch(errors => this.setState({ errors }));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      organisation: this.state.organisation,
      linkedinUrl: this.state.linkedinUrl,
      twitterUrl: this.state.twitterUrl,
      profilePic: this.state.profilePic,
      bannerPic: this.state.bannerPic,
      tagline: this.state.tagline,
      bio: this.state.bio
    };

    this.props.updateUser(this.props.auth.user._id, userData);
    // window.location.reload();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.chapter) {
      axios
        .get(`/api/chapters/${nextProps.auth.user.chapter}`)
        .then(res => {
          this.setState({
            chapter: res.data
          });
        })
        .catch(err => {
          this.setState({
            errors: err
          });
        });
    }

    const userValues = Object.entries(nextProps.auth.user);
    userValues.forEach(prop => {
      this.setState({ [prop[0]]: prop[1] });
    });
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      email,
      organisation,
      admin,
      lead,
      linkedinUrl,
      twitterUrl,
      bannerPic,
      profilePic,
      tagline,
      bio,
      errors,
      chapter
    } = this.state;

    return (
      <div className="profile">
        <div
          className="jumbotron-fluid "
          style={{ background: `url(${bannerPic})` }}
        >
          <i className="image-upload far fa-images" />
        </div>
        <div className="profilePic">
          <img
            src={profilePic}
            className="img-fluid profilePic"
            alt="profile image"
          />
          <i className="image-upload far fa-images" />
        </div>
        <div className="container-fluid ">
          <div className="row">
            {/* LEFT */}
            <div className="col-md-1 bg-main-red p-5 " />
            {/* RIGHT */}
            <div className="col-md-10 text-center right">
              <div className="row">
                <div className="col-md-10 offset-md-1 bg-main-white p-5 mt-2">
                  <h1 className="form-inline display-4">
                    <input
                      className="nameInput"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={this.onChange}
                      error={errors.firstName}
                    />
                    <input
                      className="nameInput"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                  </h1>

                  <div className="row">
                    <div className="col-md-5  bg-main-white text-left pt-3">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item my-2">
                          <i className="fab fa-twitter px-2" />
                          <input
                            placeholder="Add your Twitter URL"
                            type="text"
                            name="twitterUrl"
                            value={twitterUrl}
                            onChange={this.onChange}
                            error={errors.email}
                          />
                        </li>
                        <li className="list-group-item my-2">
                          <i className="fab fa-linkedin px-2" />
                          <input
                            placeholder="Add your LinkedIn URL"
                            type="text"
                            name="linkedinUrl"
                            value={linkedinUrl}
                            onChange={this.onChange}
                            error={errors.linkedinUrl}
                          />
                        </li>

                        <li className="list-group-item my-2">
                          <i className="fas fa-envelope px-2" />
                          <input
                            placeholder="Add your Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-7  bg-main-white text-left pt-3">
                      <div className="row">
                        <h4 className="col-md-4">Chapter: </h4>
                        <h4 className="col-md-8">
                          {chapter ? (
                            <Link
                              className="col-md-8 cityName"
                              to={`/chapters/${chapter._id}`}
                            >
                              {chapter.city}
                            </Link>
                          ) : (
                            ''
                          )}
                          {admin ? <small>(admin)</small> : ''}
                          {lead ? <small>(lead)</small> : ''}
                        </h4>
                      </div>
                      <div className="form-inline my-1">
                        <label className="col-md-4" htmlFor="username">
                          Username:
                        </label>

                        <input
                          className="form-control col-md-8"
                          type="text"
                          name="username"
                          defaultValue={username}
                          onChange={this.onChange}
                          error={errors.username}
                        />
                      </div>
                      <div className="form-inline my-1">
                        <label className="col-md-4" htmlFor="email">
                          Email:
                        </label>

                        <input
                          className="form-control col-md-8"
                          type="email"
                          name="email"
                          defaultValue={email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="form-inline my-1">
                        <label className="col-md-4" htmlFor="organisation">
                          Organisation:
                        </label>

                        <input
                          className="form-control col-md-8"
                          type="text"
                          name="organisation"
                          defaultValue={organisation}
                          onChange={this.onChange}
                          error={errors.organisation}
                        />
                      </div>
                      <div className="form-inline py-3">
                        <label htmlFor="" className="col-md-4">
                          Banner Image
                        </label>
                        <input
                          type="file"
                          className="form-control-file col-md-8"
                          name="bannerPic"
                          onChange={e => this.addPhoto(e, 'bannerPic')}
                        />
                      </div>
                      <div className="form-inline py-1">
                        <label htmlFor="" className="col-md-4">
                          Profie Image
                        </label>
                        <input
                          type="file"
                          className="form-control-file col-md-8"
                          name="profilePic"
                          onChange={e => this.addPhoto(e, 'profilePic')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="image-uploads text-center" />
                </div>
                <br />
                <div className="col-md-8 offset-md-2 bg-main-white mt-5 p-3 text-left">
                  <div className="form-group mx-2">
                    <label htmlFor="tagline">Tagline</label>
                    <input
                      placeholder="Sum yourself up in one sentence"
                      className="form-control form-control-lg"
                      type="text"
                      name="tagline"
                      defaultValue={tagline}
                      onChange={this.onChange}
                      error={errors.tagline}
                    />
                  </div>
                </div>
                <div className="col-md-8 offset-md-2 bg-main-white p-3 text-left">
                  <div className="form-group mx-2">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      className="form-control form-control-lg"
                      name="bio"
                      onChange={this.onChange}
                      error={errors.bio}
                      rows="20"
                      value={bio}
                    />
                  </div>
                </div>
                <div className="col-md-8 offset-md-2 bg-main-white mb-5 p-3 text-left">
                  <input
                    type="submit"
                    className="btn"
                    value="Save Changes"
                    onClick={this.onSubmit}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-1 bg-main-red p-5 " />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser, updateUser }
)(Profile);
