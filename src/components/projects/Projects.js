import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getProjects } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Projects extends Component {
  componentWillMount() {
    this.props.getProjects();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects.projects === "") {
      this.props.getProjects();
    }
  }

  render() {
    const { projects } = this.props.projects;
    let projectList;

    if (projects === "") {
      projectList = "Loading";
    } else {
      projectList = projects.map((project, index) => {
        return (
          <div className="col-md-4 p-3" key={index}>
            <Link to={`/projects/${project.id}`} className="card">
              <div>
                <h4 className="card-title">{project.title}</h4>
                <div className="card-body">{project.intro}</div>
              </div>
            </Link>
          </div>
        );
      });
    }

    return (
      <div className="projects container-fluid text-center">
        <div className="jumbotron">
          <h1 className="display-4">Projects</h1>
          <h6>
            Have an idea of your own? <br />
            <Link to="/projects/new">Tell us about it</Link>
          </h6>
        </div>
        <div className="container text-center">
          <div className="row" style={{ margin: "auto" }}>
            {projectList}
          </div>
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  projects: state.projects
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Projects);
