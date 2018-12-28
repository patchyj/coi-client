import axios from "axios";
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8080";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_HEROKU_API;
}

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
