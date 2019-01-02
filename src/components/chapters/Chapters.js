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
            About 9 months after our launch in January 2016 we realised that the
            demand for social intrapreneurship was truly global and yet we, were
            only running events in our home city of London, UK. Therefore we
            decided to launch Circle Chapters in strategic locations around the
            world with inspiring leaders we had met along the way. We started in
            Singapore in Nov 2016 and, by the end of 2017 we had 20 chapters
            live around the world & we are still growing! Our chapter leads are
            the heart of everything the Circle does and are there to help
            create, and support, social intrapreneurs in their cities. Think you
            have what it takes to become a Circle Chapter Lead? Drop an email
            with your CV to{" "}
            <a href="mailto:team@circleofyi.com">team@circleofyi.com</a>
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
