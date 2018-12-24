import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Projects extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projects.projects === "") {
      this.props.getProjects();
    }
  }

  render() {
    const { projects } = this.props.projects;
    let results;

    if (projects.length !== 0) {
      results = projects
        .map((project, index) => {
          return (
            <div className="col-md-4 p-3" key={index}>
              <Link to={`/projects/${project._id}`} className="card">
                <div>
                  <h4 className="card-title">{project.title}</h4>
                  <div className="card-body">{project.intro}</div>
                </div>
              </Link>
            </div>
          );
        })
        .reverse();
    } else {
      results = <div className="spinner" />;
    }

    return (
      <div className="projects container-fluid ">
        <div className="background" />
        <div className="background-text">
          <h1 className="display-4">Projects</h1>
          <p className="p-responsive">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="jumbotron text-center">
          <h6 className="display-4-5">
            Have an idea of your own?{" "}
            <Link to="/projects/new">Tell us about it</Link>
          </h6>
        </div>
        <div className="container-fluid jumbotron-2 bg-main-white py-2">
          <p className="display-4-5 mb-0 p-5">
            Need inspiration? Browse through the proposals submitted by other
            members of the Circle
          </p>
        </div>
        <div className="container-fluid text-center bg-main-red-gradient">
          <div className="container">
            <div className="row" style={{ margin: "auto" }}>
              {results}
            </div>
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
