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
            Supporting social intrapreneurs to create (and deliver) projects
            inside organisations which aim to profitably-do-good is at the heart
            of what the Circle is all about. Please use this section of the
            website to review existing project proposals or send us an outline
            of an idea you have using the link below. This will allow us to
            mobilise our support structures to help you develop your idea.
            Remember all ideas we support must have a business case and must
            have clear social impact. Get your creative juices flowing...
          </p>
        </div>
        <div className="jumbotron text-center" style={{ marginTop: "40px" }}>
          <h6 className="display-4-5 py-5">
            Have an idea of your own?{" "}
            <Link to="/projects/new">Tell us about it</Link>
          </h6>
        </div>
        <div className="container-fluid jumbotron-2 bg-main-white py-5">
          <p className="display-4-5 mb-0 p-5">
            Need inspiration? Browse through the proposals
            <br /> submitted by other members of the Circle
          </p>
        </div>
        <div className="container-fluid text-center bg-main-red-gradient">
          <div className="container pt-5">
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
