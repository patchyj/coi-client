import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_ADMIN_USER,
  SET_LEAD_USER
} from "./types";
import Auth from "../validation/Auth.js";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/auth/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/auth/login", userData)
    .then(res => {
      // Save to local storage
      const { access_token } = res.data;
      // Set Token to session storage
      Auth.authenticateToken(access_token);
      // Set Token to Authorization headers
      setAuthToken(access_token);

      // Decode access_token to get user data
      const decoded = jwtDecode(access_token);
      // set current user
      if (decoded.admin) {
        dispatch(setAdminUser(decoded));
      } else if (decoded.chapter_lead) {
        dispatch(setLeadUser(decoded));
      } else {
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

// set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
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
  localStorage.removeItem("token");
  // Remove auth header for future ressponses
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};
