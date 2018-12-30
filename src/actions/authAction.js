import axios from "axios";
import faker from "faker";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_ADMIN_USER,
  SET_LEAD_USER,
  GET_USERS
} from "./types";

// Register
// Redux thunk allows us to use dispatch asyncronously
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    // .then(res => console.log(res))
    .then(res => {
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      // set token to local storage, which only stores string
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      if (decoded.admin) {
        dispatch(setAdminUser(decoded));
      } else if (decoded.lead) {
        dispatch(setLeadUser(decoded));
      } else {
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loggedin user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// set logged in user as admin
export const setAdminUser = user => {
  return {
    type: SET_ADMIN_USER,
    payload: user
  };
};
// set logged in user as admin
export const setLeadUser = user => {
  return {
    type: SET_LEAD_USER,
    payload: user
  };
};

// Log out user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future ressponses
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};

export const getUsers = () => dispatch => {
  axios
    .get("/api/users")
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      // console.log(res.data);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {} // If user doesn't have a profile they need to see a message telling them to create one
      })
    );
};

export const getCurrentUser = () => dispatch => {
  axios
    .get("/api/users/current")
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
      // console.log(res.data);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {} // If user doesn't have a profile they need to see a message telling them to create one
      })
    );
};

export const updateUser = (id, userDate) => dispatch => {
  axios
    .put(`/api/users/${id}`, userDate)
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

export const setAdmin = (id, history) => dispatch => {
  axios
    .get(`/api/users/${id}/admin`)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      history.push(`/admin`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setLead = (id, history) => dispatch => {
  axios
    .get(`/api/users/${id}/lead`)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
      history.push(`/admin`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
