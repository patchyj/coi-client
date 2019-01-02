import axios from "axios";
import { GET_ERRORS, GET_CHAPTERS } from "./types";

export const getChapters = () => dispatch => {
  axios
    .get("/api/chapters")
    .then(res => {
      dispatch({
        type: GET_CHAPTERS,
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
