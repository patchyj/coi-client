import React, { Component } from "react";
import logo from "../../img/logo.png";

export default () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 py-5 text-center">
        <img src={logo} alt="Logo" />
        <h1 className="display-5 py-5">
          Please check your emails and follow the instructions
        </h1>
      </div>
    </div>
  );
};
