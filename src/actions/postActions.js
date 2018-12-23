import axios from "axios";
import { GET_ERRORS, GET_POSTS, GET_POST } from "./types";

export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
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

export const getPosts = () => dispatch => {
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
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

export const createPost = (newPost, history) => dispatch => {
  axios
    .post("/api/posts", newPost)
    .then(res => {
      history.push(`/posts`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editPost = (post, id, history) => dispatch => {
  console.log(post);
  axios
    .put(`/api/posts/${id}`, post)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
      history.push(`/posts/${id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deletePost = id => dispatch => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    axios
      .delete(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: GET_POSTS,
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

export const addComment = (newComment, history) => dispatch => {
  axios
    .post(`/api/posts/${newComment.post_id}/comments`, newComment)
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
      history.push(`/posts/${newComment.post_id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
