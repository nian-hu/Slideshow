import React from 'react';
import PictureIndexItem from './picture_index_item';

class PictureIndex extends React.Component {
  componentDidMount() {
    // Fetch pictures from database when component first mounts
    this.props.fetchPictures();
  }

  componentDidUpdate(prevProps) {
    // Fetch pictures again on a hard refresh
    if (prevProps.match.params.listingId !== this.props.match.params.listingId) {
      this.props.fetchPictures();
    }
  }

  render() {
    const { pictures } = this.props;
    // On the first render, pictures will be undefined
    // They must be fetched when the component mounts
    // On the second render, the pictures will be available
    if (!pictures) {
      return <div>Loading...</div>
    }
    
    const pictureItems = pictures.map((picture, idx) => {
      return (
        // Use a unique key for every list element so React DOM 
        // can recognize that they are different 
        <div key={idx}>
          <PictureIndexItem picture={picture} />
        </div>
        // Send picture to child component as inline prop
      )
    })

    return (
      <div>
        <ul>
          {pictureItems}
        </ul>
      </div>
    )
  }
}

export default PictureIndex;