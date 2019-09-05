import React from 'react';
import { withRouter } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    $.ajax({
      method: 'POST',
      url: 'api/pictures',
      data: formData,
      contentType: false,
      processData: false
    }).then(
      this.props.history.push('/')
    )
  }

  handleClick() {
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

export default withRouter(Upload);