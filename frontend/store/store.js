import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

// Create store using the root reducer, thus shaping the state as an object
// with a high level key of "entities" pointing to an object with a key of 
// "pictures" pointing to the relevant information that is then rendered on the screen

export default (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk))
}