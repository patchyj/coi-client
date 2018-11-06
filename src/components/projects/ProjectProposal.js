import React, { Component } from "react";
import axios from "axios";

class ProjectProposal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      intro: "",
      impact: "",
      businesscase: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProject = {
      title: this.state.title,
      intro: this.state.intro,
      impact: this.state.impact,
      businesscase: this.state.businesscase
    };

    axios
      .post("/projects", newProject)
      .then(res => this.props.history.push("/projects"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="projects container-fluid">
        <div className="row">
          <div className="col-md-6 text-center bg-main-grey p-5">
            <h1 className="display-2 mb-5">Have an idea?</h1>
            <p className="display-4  mt-5">
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
                <textarea
                  name="title"
                  id=""
                  cols="30"
                  rows="2"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <label className="label">
                  Write a short introduction for your idea
                </label>
                <textarea
                  name="intro"
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.intro}
                />
              </div>
              <div className="form-group">
                <label className="label">
                  Give an overview of your proposal's impact here
                </label>
                <textarea
                  name="impact"
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.impact}
                />
              </div>
              <div className="form-group">
                <label className="label">
                  How would this be viewed from a businesscase point of view?
                </label>
                <textarea
                  name="businesscase"
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.businesscase}
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

export default ProjectProposal;
