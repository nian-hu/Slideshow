# Photo Slideshow
### [Visit the live site](https://bubble-slideshow.herokuapp.com/#/)

## Summary

I used Ruby on Rails with a PostgreSQL database on the backend and React and Redux on the frontend in order to create this single-page application. The key features of this site consist of an index page (‘/’) that displays a slideshow of photos that changes every 5 seconds, as well as an upload page (‘/upload’) that allows users to upload a picture. I used Amazon Web Services S3 for photo storage and file upload functionality. 

## Backend Setup

My first step was to set up my database. I generated a migration to create a Pictures table that contains a row for timestamps and a row for title. I also created the corresponding model, view, and controller for my Picture model. Then, I set up Active Storage in order to upload and reference files in AWS and attach those files to Active Records. I generated migrations for the attachments and blobs table and added the corresponding attachment association (“has_one_attached :photo”) to my Picture model. In the Pictures Controller, I made sure to avoid N+1 queries by using “with_attached_photo” in the index action. Now, I was able to attach photos to my pictures. I tested this out in my seed file by creating pictures with titles and attaching a photo from AWS using the photo association. To my pleasure, it worked. I successfully seeded three pictures with photos from Unsplash.

```
class Api::PicturesController < ApplicationController
  def index
    # Avoid N+1 queries by using "with_attached_photo"
    @pictures = Picture.with_attached_photo.all 
    if @pictures
      render :index
    else
      render json: ['Pictures not found'], status: 422
    end
  end
  //...
 end
 ```

## Frontend Setup

Next, I started working on the frontend. I created a frontend folder containing folders for my actions, components, reducers, store, and utilities. I set up a static pages controller with a root view containing a ```<main id=”root”></main>``` and I updated my routes file to root to static pages#root. I also created an entry file, titled “index.jsx,” in which I rendered my app into the #root container. Next, I set up my Redux store to establish a normalized state. In my utilities folder, I created an API that accesses my backend through AJAX requests. In my actions folder, I created thunk action creators and regular action creators in order to dispatch the AJAX requests and send the response to the reducer. 

Then, I started on my React components. I wrapped my main App component in Provider to gain access to the store, as well as HashRouter in order to manipulate the URL. I made two components, Picture Index and Upload, that render at the routes “/” and “/upload” respectively.

```
const App = () => {
  return (
    <div>
      <Route exact path='/' component={PictureIndexContainer} />
      <Route exact path='/upload' component={Upload} />
    </div>
  )
}
```

## Image Change Functionality

At first, my index component was designed to render a list of all uploaded pictures. This was done for testing purposes, to ensure that the pictures were being fetched and displayed correctly. I created a child component, Picture Index Item, which was purely responsible for rendering the picture’s attached photo. In the parent component, Picture Index, I mapped over the array of picture objects given to me from my props. For every picture, I rendered a Picture Index Item and passed down the picture as an inline prop. I also made sure to give every list element a unique key so that the React DOM can recognize that they are different elements.

However, I ended up discarding this after I implemented the image change functionality. Instead of displaying all uploaded pictures, I only displayed one picture at a time with a 5-second interval. 

```
  componentDidMount() {
    // Fetch pictures from database when component first mounts
    this.props.fetchPictures();

    // Set the 5-second interval as soon as the component mounts
    this.interval = setInterval(() => this.changeImage(), 5000)
  }
 ```

I accomplished this by continuously looping over the pictures in my array, keeping track of the current picture’s index with the variable currentPicture stored in the component’s internal state. I changed the image by continuously incrementing the currentPicture variable, set initially at 0, by one until it reaches the end of the pictures array. Every time the currentPicture variable increments, I would update the state with its new value. In this way, the currentPicture variable in the internal state would keep track of the current index and move along the length of the array until the end. In the component’s render method, I was able to access the current image by indexing into the pictures array at the currentPicture variable.

```
// Set the state to the next picture, causing render method to re-render
  changeImage() {
    // From our props, pictures is an array of picture objects
    const { pictures } = this.props;
    const { currentPicture } = this.state;
    const numPictures = pictures.length;
    let nextPicture = 0;

    // Continue incrementing the index (set initially at 0) by one
    // until it reaches the end of the array of pictures
    if (currentPicture !== numPictures - 1) {
      nextPicture = currentPicture + 1;
    }

    // With every incrementation of the index, save the new index
    // in the internal state, so we can use it to access the 
    // relevant picture down in the render method
    this.setState({currentPicture: nextPicture})
  }
  ```

## Upload Functionality

In my upload component, I rendered a form with a text input field for the title, a file input button for file uploads, and a submit button. I made an internal state in order to store the information of any photo that is uploaded via the form. 

When the user types in the text input field, it triggers the handleChange function which sets the state accordingly, with a key of “title” pointing to whatever was typed in the input field. Similarly, when the user uploads a file, it triggers the handleFile function which sets the state as well, with a key of “photoFile” pointing to the relevant file. 

Finally, when the user submits the form, it sends an AJAX request that triggers the create action of the Pictures Controller. If the photo saves successfully in the backend, then the user is redirected back to the index page where they can see their newly uploaded photo included in the existing slideshow of images. For all of these callback functions, I made sure to bind them in the constructor function so they don’t lose context when they’re invoked in the render method.

```
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
```
