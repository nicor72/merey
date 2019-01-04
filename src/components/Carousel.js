import React, { Component } from 'react';
import Slider from "react-slick";

import logoMerey from './../images/merey_logo.png';
import tiendaMerey from './../images/tienda_merey.jpg';
import mani from './../images/mani.jpg';
import clavoOlor from './../images/clavo_olor.jpg';
import work from './../images/work.jpg';
import nuts from './../images/nuts.jpg';

class Carousel extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: false,
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={tiendaMerey} alt="tienda_merey" />
        </div>
        <div>
          <img src={nuts} alt="nuts" />
        </div>
        <div>
          <img src={work} alt="work" />
        </div>
        <div>
          <img src={mani} alt="mani" />
        </div>
        <div className="nav-height">
          <img src={logoMerey} alt="logo_merey" />
        </div>
        <div>
          <img src={clavoOlor} alt="clavo de olor" />
        </div>
      </Slider>
    );
  }
}

export default Carousel;