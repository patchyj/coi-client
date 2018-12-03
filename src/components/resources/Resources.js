import React, { Component } from "react";
import SlideShow from "react-slideshow-ui";
import ResourceModal from "../common/ResourceModal";

class Table extends Component {
  render() {
    let rows = [];
    //Inner loop to create rows
    for (let j = 1; j < 4; j++) {
      rows.push(
        <tr>
          <th scope="row">
            <a className="btn" data-toggle="modal" data-target={`#modal-${j}`}>
              Launch demo modal
            </a>
            <ResourceModal id={`${j}`} />
          </th>
          <td>Jacob</td>
          <td className="text-center">
            <a href="">
              <i className="fas fa-download" />
            </a>
          </td>
        </tr>
      );
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Resource</th>
            <th scope="col">Description</th>
            <th className="text-center" scope="col">
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {/* LOOP THROUGH THE RESOURCES DEPENDING ON THE 'C' PROPS */}
          {rows}
        </tbody>
      </table>
    );
  }
}

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: ""
    };
  }

  render() {
    const tabs = ["Convert", "Create", "Construct", "Commit", "Control"].map(
      (tab, index) => {
        return (
          <a
            className={`nav-item nav-link ${index === 0 ? "active" : ""}`}
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            {tab}
          </a>
        );
      }
    );
    return (
      <div className="resources">
        <div className="container py-5">
          <h1 className="display-4 py-5">Resources</h1>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              {tabs}
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <Table />
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <Table />
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <Table />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Resources;
