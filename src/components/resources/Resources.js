import React, { Component } from "react";
import ResourceModal from "../common/ResourceModal";
import resources from "./FiveC";

class ResourceTable extends Component {
  render() {
    const rows = this.props.data.map((data, key) => {
      let download;
      if (typeof data.url === "string") {
        download = (
          <a href={data.url} download>
            <i className="fas fa-download" />
          </a>
        );
      } else {
        download = "";
      }
      return (
        <tr key={"row" + key}>
          <th scope="row">
            <a
              className="btn"
              data-toggle="modal"
              data-target={`#modal-${data.id}`}
            >
              {data.resource}
            </a>
            <ResourceModal data={data} />
          </th>
          <td>{data.description}</td>
          <td className="text-center">{download}</td>
        </tr>
      );
    });

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
      bgImage: 0,
      bgText: 200,
      bgTrigger: null
    };
  }

  componentDidMount() {
    const bgTrigger = document.getElementById("bgTrigger");
    const bgText = document.getElementById("bgText");
    this.setState({
      bgImage: `${Math.floor(bgTrigger.getBoundingClientRect().top * 0.75) -
        400}`,
      bgText: `${Math.floor(bgText.getBoundingClientRect().top)}`
    });
    window.addEventListener("scroll", this.handleScroll);
    console.log(bgText.getBoundingClientRect().top);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const bgTrigger = document.getElementById("bgTrigger");
    this.setState({
      bgTrigger: bgTrigger.getBoundingClientRect().top,
      bgImage: `${Math.floor(bgTrigger.getBoundingClientRect().top * 0.75) -
        400}`,
      bgText: `${Math.floor(bgTrigger.getBoundingClientRect().top * 0.45)}`
    });
    // console.log(this.state.bgText);
    const bgText = document.getElementById("bgText");
    console.log(bgText.getBoundingClientRect().top);
  };

  render() {
    const tabs = resources.map((resource, key) => {
      return (
        <a
          className={`nav-item nav-link ${key === 0 ? "active" : ""}`}
          id={`nav-${key}-tab`}
          data-toggle="tab"
          href={`#nav-${key}`}
          role="tab"
          key={key}
          aria-controls={`nav-${key}`}
          aria-selected="true"
        >
          {resource.name}
        </a>
      );
    });
    const panels = resources.map((resource, key) => {
      return (
        <div
          className={`tab-pane fade show ${key === 0 ? "active" : ""}`}
          id={`nav-${key}`}
          role="tabpanel"
          aria-labelledby={`nav-${key}-tab`}
          key={`pane-${key}`}
        >
          <ResourceTable data={resources[key].data} />
        </div>
      );
    });
    return (
      <div className="resources">
        <div
          className="background"
          id="bgImage"
          style={{ top: `${this.state.bgImage}px` }}
        />
        <div
          className="background-text"
          id="bgText"
          style={{ top: `${this.state.bgText}px` }}
        >
          <h1>
            <span className="display-4">Welcome to The Circle!</span>
          </h1>
          <p className="p-responsive">
            Welcome to the resource page! Here you will find all the information
            you need on The Circle of Young Intrapreneurs. We want you to know
            every thing there is to know about us so if there is any thing you
            can’t find here, please do contact us for more information.
          </p>
        </div>
        <div className="jumbotron jumbotron-fluid" id="bgTrigger">
          <div className="container py-5">
            <p className="p-responsive">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="container-fluid py-5 bg-main-white">
          <div className="container">
            {/* NAV */}
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {tabs}
              </div>
            </nav>
            {/* CONTENT */}
            <div className="tab-content" id="nav-tabContent">
              {panels}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Resources;
