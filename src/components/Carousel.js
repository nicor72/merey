import React from 'react'
import cerealPlate from '../images/cereal_plate.jpg'
import Carousel from 'react-bootstrap/Carousel'

export default () =>
  <Carousel>
    <Carousel.Item>
      <img
        height={500}
        className="d-block w-100"
        src={cerealPlate}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
