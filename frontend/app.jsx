import React from 'react'
import Slideshow from '../components/slideshow/slideshow';
import Upload from '../components/upload/upload';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={Slideshow} />
      <Route exact path='/upload' component={Upload} />
    </div>
  )
}

export default App;
