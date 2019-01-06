import {
  GET_CHAPTER,
  GET_CHAPTERS,
  GET_CHAPTER_MEMBERS
} from "../actions/types";

const initialState = {
  chapter: null,
  chapters: null,
  members: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAPTER:
      return {
        ...state,
        chapter: action.payload
      };
    case GET_CHAPTER_MEMBERS:
      return {
        ...state,
        members: action.payload
      };
    case GET_CHAPTERS:
      return {
        ...state,
        chapters: action.payload
      };
    default:
      return state;
  }
}
