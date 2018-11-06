import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

const initialState = {};

// Create store takes in 3 things - a (root) reducer, preloaded state and enhancers (middleware and redux chrome extension)
// const store = createStore(() => [], {}, applyMiddleware());


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  ));

export default store;
