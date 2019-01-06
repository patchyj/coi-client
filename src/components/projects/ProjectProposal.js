import React, { Component } from "react";
import { createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class ProjectProposal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      intro: "",
      impact: "",
      businesscase: "",
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

  onSubmit(e) {
    e.preventDefault();

    const newProject = {
      title: this.state.title,
      intro: this.state.intro,
      impact: this.state.impact,
      businesscase: this.state.businesscase
    };

    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="projects container-fluid">
        <div className="row" style={{ marginRight: "0" }}>
          <div className="col-md-6 text-center bg-main-red-gradient p-5">
            <h1 className="display-2 mb-5">Have an idea?</h1>
            <p className="display-4-5  mt-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laboriosam incidunt dolores magni quo voluptatibus expedita!
            </p>
            <p className="mt-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laboriosam incidunt dolores magni quo voluptatibus expedita!
            </p>
          </div>
          <div className="col-md-6 bg-main-white p-5">
            <h1 className="display-5">Tell us about it</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label className="label">Give a title for your proposal</label>
                <TextAreaFieldGroup
                  placeholder=""
                  cols="30"
                  rows="2"
                  name="title"
                  value={this.state.title}
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
                  value={this.state.intro}
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
                  value={this.state.impact}
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
                  value={this.state.businesscase}
                  onChange={this.onChange}
                  error={errors.businesscase}
                />
              </div>
              <input type="submit" value="Submit your idea" className="" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProjectProposal.propTypes = {
  projects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  projects: state.projects,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    createProject
  }
)(ProjectProposal);
