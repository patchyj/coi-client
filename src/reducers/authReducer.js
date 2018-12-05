import Auth from "../validation/Auth";

import {
  SET_CURRENT_USER,
  SET_ADMIN_USER,
  SET_LEAD_USER
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  isLead: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Auth.isUserAuthenticated(),
        user: action.payload
      };
    case SET_ADMIN_USER:
      return {
        ...state,
        isAuthenticated: Auth.isUserAuthenticated(),
        isAdmin: true,
        user: action.payload
      };
    case SET_LEAD_USER:
      return {
        ...state,
        isAuthenticated: Auth.isUserAuthenticated(),
        isLead: true,
        user: action.payload
      };
    default:
      return state;
  }
}
