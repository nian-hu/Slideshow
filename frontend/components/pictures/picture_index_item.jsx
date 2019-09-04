import React from 'react';

// Deconstruct picture from inline props
// and display title and attached photo

const PictureIndexItem = ({picture}) => {
  return (
    <div>
      <h1>{picture.title}</h1>
      <img src={picture.photoUrl}/>
    </div>
  )
}

export default PictureIndexItem;