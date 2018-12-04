import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResourceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { id, resource, description, download, url } = this.props.data;
    const uniqueID = resource.split(" ").join("");
    let display;
    if (typeof url === "string") {
      display = <img src={url} className="img-fluid" />;
    } else if (typeof url === "object") {
      const slides = url.map((img, key) => {
        return (
          <div
            className={`carousel-item ${key === 0 ? "active" : ""}`}
            key={`carousel-key-${key}`}
          >
            <img className="d-block w-100" src={img} alt="carousel img" />
          </div>
        );
      });

      display = (
        <div id={`${uniqueID}`} className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">{slides}</div>
          <a
            className="carousel-control-prev"
            href={`#${uniqueID}`} // need to be unique
            role="button"
            data-slide="prev"
          >
            <i className="fas fa-chevron-left fa-2x" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href={`#${uniqueID}`} // need to be unique
            role="button"
            data-slide="next"
          >
            <i className="fas fa-chevron-right fa-2x" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      );
    }
    return (
      <div
        className="modal fade"
        id={`modal-${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`modal-${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">{display}</div>
            <div className="modal-footer">
              <h5 className="modal-title" id="exampleModalLabel">
                {resource}
              </h5>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceModal;
