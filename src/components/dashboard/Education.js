import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

// Actions
import { deleteEducation } from '../../actions/profileAction';

class Education extends Component {

  onDeleteClick(id){
    this.props.deleteEducation(id);
  }

  render(){
    const education = this.props.education.map(exp => (
      <tr className="" key={exp._id}>
        <td>{ exp.school }</td>
        <td>{ exp.degree }</td>
        <td>{ exp.fieldofstudy }</td>
        <td>
          <Moment format="MMM YYYY">{ exp.from }</Moment>{' to '}
          { exp.to === null ? ('present') : (<Moment format="MMM YYYY">{ exp.to }</Moment>) }
        </td>
        <td>
          <button onClick={ this.onDeleteClick.bind(this, exp._id) }className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ))

    return(
      <div >
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th></th>
            </tr>
            { education }
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
