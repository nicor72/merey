import React, { Component } from 'react';
import logo from './../images/merey_logo.png';

class Carousel extends Component {
  render() {
    return (
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={logo} className="d-block w-100" alt="logo" />
            </div>
            <div className="carousel-item">
              <img src={logo} className="d-block w-100" alt="logo" />
            </div>
            <div className="carousel-item">
              <img src={logo} className="d-block w-100" alt="logo" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Carousel;