import axios from "axios";
import { GET_ERRORS, GET_PROJECTS } from "./types";

export const getProjects = () => dispatch => {
  axios
    .get("/projects")
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
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

export const deleteProject = id => dispatch => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    axios
      .delete(`/projects/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROJECTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
// .then()
