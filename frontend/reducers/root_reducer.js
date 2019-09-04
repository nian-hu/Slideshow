import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer'

// Create overarching root reducer in case we want to expand
// and add more in the future (such as a sessions reducer, errors reducer, etc)

const rootReducer = combineReducers({
  entities: entitiesReducer,
})

export default rootReducer;