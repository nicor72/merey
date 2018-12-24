import React, { Component } from 'react';
import Carousel from './components/Carousel';
import Info from './components/Info';

class Home extends Component {
  render() {
    return (
      <div>
        <Carousel />
        <Info />
      </div>
    );
  }
}

export default Home;
