import { RECEIVE_ALL_PICTURES, RECEIVE_PICTURE } from '../actions/picture_actions';
import { merge } from 'lodash';

// When the actions hit the reducer, the reducer will respond by
// adding the pictures or singular picture to the state, nested
// under the key of "pictures" as described in the entities reducer

const picturesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_PICTURES: {
      return merge({}, action.pictures)
    }
    case RECEIVE_PICTURE: {
      const newState = merge({}, state);
      newState[action.picture.id] = action.picture;
    }
    default: {
      return state;
    }
  }
}

export default picturesReducer;