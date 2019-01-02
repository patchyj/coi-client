import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from "./types";

export const getProjects = () => dispatch => {
  axios
    .get("/api/projects")
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {} // If user doesn't have a profile they need to see a message telling them to create one
      })
    );
};

export const getProject = id => dispatch => {
  axios
    .get(`/api/projects/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {} // If user doesn't have a profile they need to see a message telling them to create one
      })
    );
};

export const createProject = (newProject, history) => dispatch => {
  axios
    .post("/api/projects", newProject)
    .then(res => {
      history.push(`/projects`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteProject = id => dispatch => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    axios
      .delete(`/api/projects/${id}`)
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
