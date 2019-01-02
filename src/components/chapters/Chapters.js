import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

class Chapters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapters: [],
      errors: {}
    };
  }

  componentDidMount() {
    axios
      .get("/api/chapters")
      .then(res => {
        this.setState({
          chapters: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let results;

    if (this.state.chapters.length !== 0) {
      results = (
        <table className="table table-striped table-sm table-hover text-center">
          <thead>
            <tr className="thead-red">
              <th>Chapter</th>
              <th>Country</th>
              <th>Formed</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {this.state.chapters.map((chapter, key) => {
              return (
                <tr key={key}>
                  <td>
                    <Link to={`/chapters/${chapter._id}`}>{chapter.city}</Link>
                  </td>
                  <td>{chapter.country}</td>
                  <td>
                    <Moment format="D MMM YYYY" withtitle="true">
                      {chapter.date}
                    </Moment>
                  </td>
                  <td>{chapter.members > 0 ? chapter.members : "0"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      results = (
        <div className="py-5">
          <div className="spinner" />
        </div>
      );
    }

    return (
      <div className="chapters">
        <div className="background" />
        <div className="background-text">
          <h1 className="display-4">Chapters</h1>
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
        <div className="container-fluid bg-main-white">
          <div className="jumbotron jumbotron-fluid bg-main-white">
            {results}
          </div>
        </div>
      </div>
    );
  }
}

export default Chapters;
