import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProject, deleteProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  deleteProject(e) {
    const id = this.props.match.params.id;
    this.props.deleteProject(id);
    this.props.history.push("/projects");
    window.location.reload();
  }

  render() {
    let result;
    let author;
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
                : ""}
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

    return <div className="project container py-5">{result}</div>;
  }
}

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects,
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProject, deleteProject }
)(Project);
