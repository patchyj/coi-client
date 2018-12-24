import axios from "axios";
axios.defaults.baseURL = "https://coi-node-api.herokuapp.com";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
