import { combineReducers } from "redux";

import AuthReducer from "./authReducer";
import ErrorReducer from "./errorReducer";
import ProfileReducer from "./profileReducer";
import ProjectReducer from "./projectReducer";
import PostsReducer from "./postsReducer";

export default combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  profile: ProfileReducer,
  projects: ProjectReducer,
  posts: PostsReducer
});
