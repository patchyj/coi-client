import {
  SET_CURRENT_USER,
  SET_ADMIN_USER,
  SET_LEAD_USER,
  GET_USERS
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  isLead: false,
  user: {},
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_ADMIN_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: true,
        user: action.payload
      };
    case SET_LEAD_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isLead: true,
        user: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        users: action.payload
      };
    default:
      return state;
  }
}
