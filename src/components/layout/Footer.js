import React from "react";

export default () => {
  return (
    <div className="footer container-fluid bg-main-grey-darken p-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <ul className="list-group">
              <li className="list-group-item">
                <a href="/">Street</a>
              </li>
              <li className="list-group-item">
                <a href="/">City</a>
              </li>
              <li className="list-group-item">
                <a href="/">Country</a>
              </li>
              <li className="list-group-item">
                <a href="/">Phone</a>
              </li>
              <li className="list-group-item">
                <a href="/">Email</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item">
                <a href="/">Contact</a>
              </li>
              <li className="list-group-item">
                <a href="/">Get Involved</a>
              </li>
              <li className="list-group-item">
                <a href="/">Somethin</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <ul className="list-group">
              <li className="list-group-item">
                <a href="/">Charity</a>
              </li>
              <li className="list-group-item">
                <a href="/">Newsletter</a>
              </li>
              <li className="list-group-item">
                <a href="/">Find us</a>
              </li>
              <li className="list-group-item">
                <a href="/">More about our members</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
