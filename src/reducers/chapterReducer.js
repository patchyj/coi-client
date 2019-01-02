import { GET_CHAPTERS } from "../actions/types";

const initialState = {
  chapters: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHAPTERS:
      return {
        ...state,
        chapters: action.payload
      };
    default:
      return state;
  }
}
