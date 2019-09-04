export const fetchPictures = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/pictures'
  })
}