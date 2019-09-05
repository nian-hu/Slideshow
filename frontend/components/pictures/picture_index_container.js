import { connect } from 'react-redux';
import PictureIndex from './picture_index';
import { fetchPictures } from '../../actions/picture_actions';

// Send pictures stored in Redux state to React component
// in the form of props 

const msp = state => {
  // Pictures here refers to an array full of objects,
  // each of which contains information about a picture
  const pictures = Object.values(state.entities.pictures)
  return {
    pictures
  }
}

// Send thunk action creator to React component
// so it can fetch all pictures when component mounts

const mdp = dispatch => {
  return {
    fetchPictures: () => dispatch(fetchPictures())
  }
}

export default connect(msp, mdp)(PictureIndex)