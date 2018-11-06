import React, { Component } from "react";

class IFrameModal extends Component {
  render() {
    const { id, ariaLabel, title, url } = this.props;
    return (
      <div
        className="modal fade"
        id={id}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <iframe
                width="942"
                height="530"
                src={url}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IFrameModal;
