import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Actions
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';
// Components
import ProfileActions from './ProfileActions';
import Experience from './Experience.js'
import Education from './Education.js'
import Spinner from '../common/Spinner';

class Dashboard extends Component {

  componentDidMount(){
    this.props.getCurrentProfile();
  }

  onDeleteClick(e){
    this.props.deleteAccount();
  }

  render(){

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if ( profile === null || loading ) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data by checking the keys length of the profile is NOT 0
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h1 className="display-4">Display Profile</h1>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`} className="">{ user.name }</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom:'60px'}}>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete my account</button>
            </div>
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div className="">
            <p className="lead text-muted">Welcome { user.name } </p>
            <p>You have not yet set up a profile. Please add some info</p>
            <Link to="/create-profile" className="btn btn-large btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return(
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              { dashboardContent }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
