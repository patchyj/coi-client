import axios from "axios";
// Change the port depending on what the Node ENV is
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "http://localhost:8080"; // make sure dev server is running
} else if (process.env.NODE_ENV == "production") {
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
