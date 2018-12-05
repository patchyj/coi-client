// ========= ROOT REDUCER =========
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projects: projectReducer,
  posts: postReducer
});
