import React from 'react';

// UPDATE: No longer ended up using this child component
// after adding image change functionality on index page

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