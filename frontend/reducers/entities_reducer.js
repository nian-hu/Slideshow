import { combineReducers } from 'redux';
import picturesReducer from './pictures_reducer';

// Create overarching entities reducer in case we want to 
// expand and add more functionality to the site in the future (reviews, etc)

const entitiesReducer = combineReducers({
  pictures: picturesReducer
})

export default entitiesReducer;