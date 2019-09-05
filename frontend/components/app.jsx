import React from 'react'
import PictureIndexContainer from './pictures/picture_index_container';
import Upload from '../components/upload/upload';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={PictureIndexContainer} />
      <Route exact path='/upload' component={Upload} />
    </div>
  )
}

export default App;
