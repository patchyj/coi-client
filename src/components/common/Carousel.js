import React, { Component } from "react";

class Carousel extends Component {
  render() {
    const { data } = this.props;
    let uniqueID;
    let display;
    if (typeof data === "string") {
      display = <div className="spinner" />;
    } else if (typeof data === "object") {
      const slides = data.map((img, key) => {
        return (
          <div
            className={`carousel-item ${key === 0 ? "active" : ""}`}
            key={`carousel-key-${key}`}
          >
            <img className="d-block w-100" src={img} alt="" />
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
    return <div>{display}</div>;
  }
}

export default Carousel;
