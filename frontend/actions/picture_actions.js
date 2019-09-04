import * as PictureAPIUtil from '../util/picture_api_util';

export const RECEIVE_ALL_PICTURES = 'RECEIVE_ALL_PICTURES';

// Create regular action creator, to be received by reducer
export const receiveAllPictures = pictures => {
  return {
    type: RECEIVE_ALL_PICTURES,
    pictures
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