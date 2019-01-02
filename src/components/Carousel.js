import React, { Component } from 'react';
import Slider from "react-slick";

import mani from './../images/mani.jpg';
import tiendaMerey from './../images/tienda_merey.jpg';
import work from './../images/work.jpg';
import nuts from './../images/nuts.jpg';

class Carousel extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2500,
      fade: true,
      pauseOnHover: false,
      accessibility: true
    };
    return (
      <Slider {...settings}>
        <img src={nuts} alt="nuts" />
        <img src={work} alt="work" />
      </Slider>
    );
  }
}

export default Carousel;