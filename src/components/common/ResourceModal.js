import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResourceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div
        className="modal fade"
        id={`modal-${this.props.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby={`modal-${this.props.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title {this.props.id}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceModal;
