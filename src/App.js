import React, { Component } from 'react';
import './App.css';
import Movie from './containers/Movie/Movie';
import Navigation from '../src/components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <div className="container">
          <Movie/>  
        </div>
      </div>
    )
  }
}

export default App;
