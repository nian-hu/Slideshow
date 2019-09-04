// Access the index action of the pictures controller
// In doing so, receive all pictures from backend

export const fetchPictures = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/pictures'
  })
}

export const createPicture = (picture) => {
  return $.ajax({
    method: 'POST',
    url: 'api/pictures',
    picture
  })
}