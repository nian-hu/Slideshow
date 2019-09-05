import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPicture } from '../../actions/picture_actions';

const mdp = dispatch => {
  return {
    createPicture: (picture) => dispatch(createPicture(picture))
  }
}

class Upload extends React.Component {
  constructor(props) {
    super(props);
    // Bind all of these callback functions in the
    // constructor so they don't lose context when invoked
    // down in the render method
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // Make internal state for the component to store
    // the title and photo file of photos that are uploaded
    // via the form, using the handleChange and handleFile 
    // methods in order to set the state accordingly whenever
    // a user types in the input field and/or uploads a file
    this.state = {
      title: "",
      photoFile: null
    }
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  handleFile(e) {
    this.setState({ photoFile: e.currentTarget.files[0] });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('picture[title]', this.state.title);
    formData.append('picture[photo]', this.state.photoFile);
    // Send an AJAX request that hits the create action of 
    // the pictures controller
    this.props.createPicture(formData).then(() =>
      this.props.history.push('/')
    )
  }

  handleClick() {
    // Redirect user to the slideshow page when they click this button
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='upload-form'>
        <h1>Upload your image</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            value={this.state.title}
            onChange={this.handleChange('title')}
            placeholder="Write a title here"
          />
          <input type="file"
            onChange={this.handleFile}
          />
          <input type="submit" value="Upload Image"/>
        </form>
        <button onClick={this.handleClick}>Back to slideshow</button>
      </div>
    )
  }
}

export default withRouter(connect(null, mdp)(Upload));
