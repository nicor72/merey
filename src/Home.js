import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Carousel from './components/Carousel';
import Info from './components/Info';

import cerealPlate from './images/cereal_plate.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron" style={{width: "100%", height: "100vh", backgroundImage: "url(" + cerealPlate + ")", backgroundSize: 'cover'}}>
          <div className="container">
            <h1 className="display-4 text-white">Ya Abrimos!</h1>
            <p className="lead text-white">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            <p className="text-white">It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
            <Link to="/estamos" onClick={this.click} className="btn btn-secondary btn-lg">
              ¿Donde estamos?
            </Link>
          </div>
        </div>
        <Info />
        <Carousel />
      </div>
    );
  }
}

export default Home;
