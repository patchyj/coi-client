import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {
  render(){
    return(
      <div className="container py-5">
        <form className="form-signin col-sm-4 offset-sm-4 py-5">
          <h1 className="h3 mb-3 font-weight-normal">Forgot your password?</h1>
          <div className="form-grou pt-5">
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control mb-5" placeholder="Email address" required autoFocus />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <ul className="list-group mt-4">
          <li className="list-group-item">
            <Link to="/register">Join us</Link>
          </li>
          <li className="list-group-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
