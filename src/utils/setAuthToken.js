// Set a default header for each request
import axios from "axios";
// axios.defaults.baseURL = "https://coyi-api.herokuapp.com";

const setAuthToken = token => {
  if (token) {
    // apply to every request
    axios.defaults.headers.common["Authorization"] = token;
    axios.defaults.headers.token = token;
    // console.log(axios.defaults.headers);
  } else {
    // Delete Auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
