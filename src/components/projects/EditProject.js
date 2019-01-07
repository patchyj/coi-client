import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getProject,
  deleteProject,
  updateProject
} from '../../actions/projectActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import axios from 'axios';

class EditProject extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      intro: '',
      impact: '',
      businesscase: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id);
    axios
      .get(`/api/projects/${id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          intro: res.data.intro,
          impact: res.data.impact,
          businesscase: res.data.businesscase
        });
      })
      .catch(err => this.setState({ errors: err }));
  }

  deleteProject(e) {
    const id = this.props.match.params.id;
    this.props.deleteProject(id);
    this.props.history.push('/projects');
    window.location.reload();
  }

  onSubmit(e) {
    e.preventDefault();

    const { id } = this.props.match.params;

    const updatedProject = {
      title: this.state.title,
      intro: this.state.intro,
      impact: this.state.impact,
      businesscase: this.state.businesscase
    };

    this.props.updateProject(updatedProject, id, this.props.history);
  }

  render() {
    let result;
    let author;
    const { title, intro, impact, businesscase, errors } = this.state;
    const { project } = this.props.projects;

    const crudLinks = (
      <div className="crudLinks">
        <Link to={`/projects/${project._id}/edit`} className="">
          <i className="fas fa-edit" />
        </Link>
        <br />
        <i onClick={this.deleteProject.bind(this)} className="fas fa-times" />
      </div>
    );

    if (project) {
      if (project.user) {
        author = (
          <Link to={`/users/${project.user._id}`}>
            {project.user.firstName} {project.user.lastName}
          </Link>
        );
      }
      const { user } = project;
      result = (
        <div>
          <div className="row py-3">
            <div className="col-md-7 offset-md-2">
              <h2>{project.title}</h2>
              <div className="row">
                <div className="col-md-6">{author}</div>
                <div className="col-md-6 text-right">
                  <p>{project.made}</p>
                </div>
              </div>
            </div>
            <div className="col-md-1">
              {this.props.auth.user.admin ||
              this.props.auth.user.id === user._id
                ? crudLinks
                : ''}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3>Intro</h3>
              <p>{project.intro}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3>Impact</h3>
              <p>{project.impact}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3>Businesscase</h3>
              <p>{project.businesscase}</p>
            </div>
          </div>
        </div>
      );
    } else {
      result = <div className="spinner" />;
    }

    return (
      <div className="project container py-5">
        <h1 className="display-4 text-center">Edit</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="label">Give a title for your proposal</label>
            <TextAreaFieldGroup
              placeholder=""
              cols="30"
              rows="2"
              name="title"
              value={title}
              onChange={this.onChange}
              error={errors.title}
            />
          </div>
          <div className="form-group">
            <label className="label">
              Write a short introduction for your idea
            </label>
            <TextAreaFieldGroup
              placeholder=""
              name="intro"
              cols="30"
              rows="3"
              value={intro}
              onChange={this.onChange}
              error={errors.intro}
            />
          </div>
          <div className="form-group">
            <label className="label">
              Give an overview of your proposal's impact here
            </label>
            <TextAreaFieldGroup
              placeholder=""
              name="impact"
              cols="30"
              rows="5"
              value={impact}
              onChange={this.onChange}
              error={errors.impact}
            />
          </div>
          <div className="form-group">
            <label className="label">
              How would this be viewed from a businesscase point of view?
            </label>
            <TextAreaFieldGroup
              placeholder=""
              name="businesscase"
              cols="30"
              rows="5"
              value={businesscase}
              onChange={this.onChange}
              error={errors.businesscase}
            />
          </div>
          <input type="submit" value="Submit your idea" className="" />
        </form>
      </div>
    );
  }
}

EditProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects,
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProject, deleteProject, updateProject }
)(EditProject);
