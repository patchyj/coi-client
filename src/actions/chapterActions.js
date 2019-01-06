import axios from "axios";
import {
  GET_ERRORS,
  GET_CHAPTER,
  GET_CHAPTER_MEMBERS,
  GET_CHAPTERS
} from "./types";

export const getChapter = id => dispatch => {
  axios
    .get(`/api/chapters/${id}`)
    .then(res => {
      dispatch({
        type: GET_CHAPTER,
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

export const getChapterMembers = id => dispatch => {
  axios
    .get(`/api/chapters/${id}/members`)
    .then(res => {
      dispatch({
        type: GET_CHAPTER_MEMBERS,
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
