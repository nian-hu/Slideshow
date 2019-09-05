import React from 'react';
import PictureIndexItem from './picture_index_item';
import { withRouter } from 'react-router-dom';

class PictureIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPicture: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // Fetch pictures from database when component first mounts
    this.props.fetchPictures();
    // Set the 5-second interval as soon as the component mounts
    this.interval = setInterval(() => this.changeImage(), 5000)
  }

  // Clear the interval when component unmounts
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  // Set the state to the next picture, causing render method to re-render
  changeImage() {
    const { pictures } = this.props;
    const { currentPicture } = this.state;
    const numPictures = pictures.length;
    let nextPicture = 0;

    if (currentPicture !== numPictures - 1) {
      nextPicture = currentPicture + 1;
    }

    this.setState({currentPicture: nextPicture})
  }

  componentDidUpdate(prevProps) {
    // Fetch pictures again on a hard refresh
    if (prevProps.match.params.listingId !== this.props.match.params.listingId) {
      this.props.fetchPictures();
    }
  }

  handleClick() {
    this.props.history.push('/upload')
  }

  render() {
    const { pictures } = this.props;
    const { currentPicture } = this.state;
    // On the first render, pictures will be empty
    // They must be fetched when the component mounts
    // On the second render, the pictures will be available
    if (!pictures) {
      return <div className="loader">Loading...</div>
    }

    const picture = pictures[currentPicture]
    if (!picture) {
      return <div className="loader">Loading...</div>
    }

    return (
      <div>
        <button onClick={this.handleClick}>Upload Photo</button>
        <img src={picture.photoUrl} />
      </div>
    )
    
    // UPDATE: No longer ended up needing this section of code
    // after I added image change functionality on index page.
    // This had previously rendered a list of all uploaded pictures
    // on the same page.

    // const pictureItems = pictures.map((picture, idx) => {
    //   return (
    //     // Use a unique key for every list element so React DOM 
    //     // can recognize that they are different 
    //     <div key={idx}>
    //       <PictureIndexItem picture={picture} />
    //     </div>
    //     // Send picture to child component as inline prop
    //   )
    // })

    // return (
    //   <div>
    //     <ul>
    //       {pictureItems}
    //     </ul>
    //   </div>
    // )
  }
}

export default withRouter(PictureIndex);