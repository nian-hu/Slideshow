import React from 'react';
import { withRouter } from 'react-router-dom';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
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

  render() {
    return (
      <div>
        <h1>Upload any image you want!</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="image-title">Title</label>
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
        <button>Back to slideshow</button>
      </div>
    )
  }
}

export default withRouter(Upload);