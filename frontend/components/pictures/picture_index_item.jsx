import React from 'react';

// Deconstruct picture from inline props
// and display title and attached photo

const PictureIndexItem = ({picture}) => {
  return (
    <div>
      <h1>{picture.title}</h1>
      <img src={picture.photoUrl}/>
      {/* <img src="https://bubble-test-seeds.s3.amazonaws.com/bubble-test-photo.jpg" /> */}
    </div>
  )
}

export default PictureIndexItem;