import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import circleMap from "../../img/map.png";

class Chapters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapters: [],
      errors: {}
    };
  }

  componentWillMount() {
    axios
      .get("/chapters")
      .then(res => {
        this.setState({
          chapters: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="chapters">
        <div className="container-fluid">
          <div
            className="jumbotron"
            style={{ background: `url(${circleMap})` }}
          />
          <span className="jumbotron_h1 display-4">Chapters</span>
        </div>
        <table className="table table-striped table-sm table-hover text-center">
          <thead>
            <tr className="thead-red">
              <th>#</th>
              <th>Chapter</th>
              <th>Country</th>
              <th>Formed</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {this.state.chapters.map((chapter, i) => {
              return (
                <tr key={i}>
                  <td>{chapter.id}</td>
                  <td>
                    <Link to={`/chapters/${chapter.id}`}>{chapter.city}</Link>
                  </td>
                  <td>{chapter.country.name}</td>
                  <td>{chapter.formed}</td>
                  <td>{chapter.members.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Chapters;
