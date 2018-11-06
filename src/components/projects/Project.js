import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {},
      author: {},
      currentUser: {}
    };
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/projects/${id}`)
      .then(res => {
        this.setState({
          project: res.data,
          author: res.data.user
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
    axios({
      url: "/profile",
      method: "get"
    })
      .then(res => {
        this.setState({ currentUser: res.data.user });
      })
      .catch(err => console.log(err));

    console.log(this.props);
  }

  deleteProject(e) {
    const id = this.props.match.params.id;
    this.props.deleteProject(id);
    this.props.history.push("/projects");
  }

  render() {
    const { project, author, currentUser } = this.state;

    const crudLinks = (
      <div className="crudLinks">
        <Link to={`/projects/${project.id}/edit`} className="">
          <i className="fas fa-edit" />
        </Link>
        <br />
        <i onClick={this.deleteProject.bind(this)} className="fas fa-times" />
      </div>
    );
    return (
      <div className="project container py-5">
        <div className="row py-3">
          <div className="col-md-7 offset-md-2">
            <h2>{project.title}</h2>
            <div className="row">
              <div className="col-md-6">
                <Link to={`/users/${author.id}`}>
                  {author.first_name} {author.last_name}
                </Link>
              </div>
              <div className="col-md-6 text-right">
                <p>{project.made}</p>
              </div>
            </div>
          </div>
          <div className="col-md-1">
            {currentUser.admin || currentUser.id === author.id ? crudLinks : ""}
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
  }
}

Project.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProject }
)(Project);
