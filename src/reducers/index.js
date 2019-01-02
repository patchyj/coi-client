import { combineReducers } from "redux";

import AuthReducer from "./authReducer";
import ErrorReducer from "./errorReducer";
import ProfileReducer from "./profileReducer";
import ProjectReducer from "./projectReducer";
import PostsReducer from "./postsReducer";
import ChapterReducer from "./chapterReducer";

export default combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  errors: ErrorReducer,
  profile: ProfileReducer,
  projects: ProjectReducer,
  chapters: ChapterReducer
});
