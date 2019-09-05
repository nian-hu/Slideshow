import React from 'react';

// Deconstruct picture from inline props
// in order to display title and attached photo

const PictureIndexItem = ({picture}) => {
  return (
    <div className='picture-index-item'>
      <img src={picture.photoUrl}/>
      <h1>{picture.title}</h1>
    </div>
  )
}

export default PictureIndexItem;