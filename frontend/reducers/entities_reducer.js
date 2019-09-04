import { combineReducers } from 'redux';
import picturesReducer from './pictures_reducer';

const entitiesReducer = combineReducers({
  pictures: picturesReducer
})

export default entitiesReducer;