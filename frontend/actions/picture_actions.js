import * as PictureAPIUtil from '../util/picture_api_util';

export const RECEIVE_ALL_PICTURES = 'RECEIVE_ALL_PICTURES';
export const RECEIVE_PICTURE = 'RECEIVE_PICTURE';

// Create regular action creator, to be received by reducer
export const receiveAllPictures = pictures => {
  return {
    type: RECEIVE_ALL_PICTURES,
    pictures
  }
}

export const receivePicture = picture => {
  return {
    type: RECEIVE_PICTURE,
    picture
  }
}

// Create thunk action creator, which dispatches AJAX request to backend
export const fetchPictures = () => {
  return dispatch =>  {
    return PictureAPIUtil.fetchPictures()
      .then(pictures => {
        return dispatch(receiveAllPictures(pictures))
      })
  }
}

// In order to create picture, send to database to be saved
// If successfully saved, then dispatch normal action creator
// to send saved picture to the frontend (to be displayed)
export const createPicture = picture => {
  return dispatch => {
    return PictureAPIUtil.createPicture(picture)
      .then(picture => {
        return dispatch(receivePicture(picture))
      }) 
  }
}