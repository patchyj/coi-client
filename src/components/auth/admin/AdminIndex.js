import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getUsers,
  getCurrentUser,
  setAdmin,
  setLead
} from '../../../actions/authAction';
import { getProjects } from '../../../actions/projectActions';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'react-moment';
// import LocationSearchInput from "../../chapters/NewChapterComponent";
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AdminCheckBox = ({ role, onChange, name, id }) => {
  let adminInput;
  if (role === 'admin') {
    adminInput = (
      <input
        role={role}
        type="checkbox"
        defaultChecked={true}
        onChange={onChange}
        name={name}
        id={id}
        className="setCheckboxes"
      />
    );
  } else {
    adminInput = (
      <input
        role={role}
        type="checkbox"
        defaultChecked={false}
        onChange={onChange}
        name={name}
        id={id}
        className="setCheckboxes"
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
  if (role === 'lead') {
    leadInput = (
      <input
        id={id}
        role={role}
        type="checkbox"
        defaultChecked={true}
        onChange={onChange}
        data-name={dataName}
        data-city={city}
        className="setCheckboxes"
      />
    );
  } else {
    leadInput = (
      <input
        id={id}
        role={role}
        type="checkbox"
        defaultChecked={false}
        onChange={onChange}
        data-name={dataName}
        data-city={city}
        className="setCheckboxes"
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
        chapter_id: 'asc'
      },
      isAdmin: false,
      address: '',
      bannerPic: '',
      twitterUrl: '',
      facebookUrl: '',
      linkedinUrl: '',
      ready: true,
      chapterName: {},
      chapterCoords: {},
      errors: {}
    };

    this.sortBy = this.sortBy.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSocialChange = this.handleSocialChange.bind(this);
  }

  handleSocialChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sortBy(key) {
    this.setState({
      users: this.state.users.sort((a, b) =>
        this.state.direction[key] === 'asc'
          ? parseInt(a[key], 10) - parseInt(b[key], 10)
          : parseInt(b[key], 10) - parseInt(a[key], 10)
      ),
      direction: {
        [key]: this.state.direction[key] === 'asc' ? 'des' : 'asc'
      }
    });
  }

  setAdminClick(e) {
    const role = e.target.attributes.role.value;
    if (role === 'admin') {
      const res = window.confirm(
        `Are you sure you want to remove ${
          e.target.attributes.name.value
        }'s admin priveleges?'`
      );
      if (res) {
        this.props.setAdmin(e.target.id, this.props.history);
      } else {
      }
    } else {
      const res = window.confirm(
        `Are you sure you want to make ${
          e.target.attributes.name.value
        } an admin?`
      );
      if (res) {
        this.props.setAdmin(e.target.id, this.props.history);
      } else {
      }
    }
  }

  setLeadClick(e) {
    const role = e.target.attributes.role.value;
    if (role === 'lead') {
      const res = window.confirm(
        `Are you sure you want to remove ${
          e.target.attributes['data-name'].value
        } as a lead of ${e.target.attributes['data-city'].value}?'`
      );
      if (res) {
        this.props.setLead(e.target.id, this.props.history);
      } else {
      }
    } else {
      const res = window.confirm(
        `Are you sure you want to make ${
          e.target.attributes['data-name'].value
        } a lead of ${e.target.attributes['data-city'].value}?`
      );
      if (res) {
        this.props.setLead(e.target.id, this.props.history);
      } else {
      }
    }
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        let countryCode = results[0].formatted_address.split(',');
        let chapter = {
          city: countryCode[0].trim(),
          country: countryCode[1].trim()
        };
        this.setState({ chapterName: chapter });
      }) // returns a promise
      .catch(error => this.setState({ error }));
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ chapterCoords: latLng }))
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    const { user } = this.props.auth;
    if (!user.admin) {
      this.props.history.push('/profile');
    }

    if (user.admin) {
      this.props.getUsers();
      this.props.getProjects();
      this.props.getCurrentUser();
    }
  }

  addPhoto(e) {
    var formData = new FormData();

    formData.append('file', e.target.files[0]);
    formData.append('name', 'test');
    this.setState({ ready: false });

    axios
      .post('/api/posts/files', formData)
      .then(res => {
        this.setState({ bannerPic: res.data.url, ready: true });
      })
      .catch(error => this.setState({ error }));
  }

  onSubmit(e) {
    e.preventDefault();
    const newChapter = {
      city: this.state.chapterName.city,
      country: this.state.chapterName.country,
      lat: this.state.chapterCoords.lat,
      lng: this.state.chapterCoords.lng,
      twitterUrl: this.state.twitterUrl,
      facebookUrl: this.state.facebookUrl,
      linkedinUrl: this.state.linkedinUrl,
      bannerPic: this.state.bannerPic
    };

    axios
      .post('/api/chapters', newChapter)
      .then(chapter => this.props.history.push(`/chapters`))
      .catch(err => this.setState({ errors: err }));
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
              <th>Username</th>
              <th>Email</th>
              <th>
                Chapter{' '}
                <i
                  className="fas fa-chevron-down"
                  onClick={() => this.sortBy('chapter_id')}
                  style={{ cursor: 'pointer' }}
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
              console.log(user);

              projects.forEach(project => {
                if (project.user) {
                  if (project.user._id === user._id) {
                    userProjects.push(project);
                  }
                }
              });

              return (
                <tr key={i}>
                  <td>
                    <Link to={`/users/${user._id}`}>
                      {user.firstName} {user.lastName}
                    </Link>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/chapters/${user.chapter ? user.chapter._id : ''}`}
                    >
                      {`${user.chapter ? user.chapter.city : ''}`}
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
                      <a href={`${user.linkedinUrl}`}>
                        <i
                          className="fab fa-linkedin"
                          style={{ color: 'lime' }}
                        />
                      </a>
                    ) : (
                      <i
                        className="fab fa-linkedin"
                        style={{ color: '#aaa' }}
                      />
                    )}
                  </td>
                  <td>
                    {user.twitterUrl ? (
                      <a href={`${user.twitterUrl}`}>
                        <i
                          className="fab fa-twitter"
                          style={{ color: 'lime' }}
                        />
                      </a>
                    ) : (
                      <i className="fab fa-twitter" style={{ color: '#aaa' }} />
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
                        city={user.chapter ? user.chapter.city : ''}
                      />
                    ) : (
                      <LeadCheckBox
                        role="user"
                        onChange={this.setLeadClick.bind(this)}
                        dataName={`${user.firstName} ${user.lastName}`}
                        id={user._id}
                        city={user.chapter ? user.chapter.city : ''}
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
        <div className="jumbotron-fluid chapterForm p-5 text-center">
          <a
            className="text-center p-5"
            data-toggle="collapse"
            href="#newChapterForm"
            role="button"
            aria-expanded="false"
            aria-controls="newChapterForm"
          >
            <h5 className="">
              Add a chapter <i className="fas fa-chev-down" />
            </h5>
          </a>

          <div className="collapse row" id="newChapterForm">
            <div className="card card-body col-md-6 offset-md-3">
              <form onSubmit={this.onSubmit}>
                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: 'Search Places ...',
                          className: 'location-search-input p-2'
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  className="my-2 p-2"
                  onChange={this.handleSocialChange}
                  value={this.state.twitterUrl}
                  name="twitterUrl"
                />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  className="my-2 p-2"
                  onChange={this.handleSocialChange}
                  value={this.state.facebookUrl}
                  name="facebookUrl"
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  className="my-2 p-2"
                  onChange={this.handleSocialChange}
                  value={this.state.linkedinUrl}
                  name="linkedinUrl"
                />
                <div className="form-group">
                  <label htmlFor="" style={{ color: 'black' }}>
                    Upload an image
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    name="image"
                    onChange={this.addPhoto}
                    style={{ color: 'black' }}
                  />
                </div>
                {this.state.ready ? (
                  <input
                    type="submit"
                    value="Submit"
                    onClick={this.onSubmit}
                    style={{ width: '100%' }}
                  />
                ) : (
                  <input type="submit" value="Uploading..." disabled />
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="table-container">{results}</div>
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
