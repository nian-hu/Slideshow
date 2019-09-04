import React from 'react'
import PicturesIndexContainer from '../components/pictures/pictures_index_container';
import Upload from '../components/upload/upload';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={PicturesIndexContainer} />
      <Route exact path='/upload' component={Upload} />
    </div>
  )
}

export default App;
