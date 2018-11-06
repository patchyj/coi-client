import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PasswordReset extends Component {
  render(){
    return(
      <div className="container">
        <form className="form-signin col-sm-4 offset-sm-4">
          <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
          <h1 className="h3 mb-3 font-weight-normal">Reset your password</h1>
          <div className="form-group">
            <label htmlFor="inputEmail" className="sr-only">Password:</label>
            <input type="password" className="form-control" required  />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail" className="sr-only">Password Confirmation</label>
            <input type="password" className="form-control" required  />
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

          <ul className="list-group mt-4">
            <li className="list-group-item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default PasswordReset;
