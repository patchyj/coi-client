import React from "react";

export default () => {
  return (
    <div className="footer container-fluid bg-main-grey-darken p-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="row">
              <div className="col-md-4">
                <ul className="list-group">
                  <li className="list-group-item">Street</li>
                  <li className="list-group-item">City</li>
                  <li className="list-group-item">Country</li>
                  <li className="list-group-item">Phone</li>
                  <li className="list-group-item">Email</li>
                </ul>
              </div>
              <div className="col-md-4 text-center">
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
              <div className="col-md-4 text-right">
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
      </div>
    </div>
  );
};
