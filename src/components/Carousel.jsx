import React, { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Row, Col, Image } from 'react-bootstrap'
import styled from 'styled-components'

const Wrapper = styled.div`
  .sliderimg {
    width: 100%;
    height: 500px;
    object-fit: contain
  }
  .carousel-btn, .thumb-btn {
    background: none;
    border: none;
    .sliderimg {
      width: 5em;
      height: 5em;
    }
  }
  .carousel-btn {
    position: relative;
    bottom: 20em;
    &.next {
      float: right;
    }
  }
`

export default ({ items, responsive, thumbs = false }) => {
  
  // useEffect(() => {
  //   if (!items.lenght) {
  //     items = urls.map((url) =>
  //       <img 
  //         src={url}
  //         className="sliderimg" 
  //         alt="banner merey"
  //       />
  //     )
  //   }
  // }, [])

  const [state, setState] = useState({ currentIndex: 0 })

  const slideTo = (index) => setState({ currentIndex: index })
  const onSlideChanged = (e) => setState({ currentIndex: e.item }) 
  const slidePrev = () => setState({ currentIndex: state.currentIndex - 1 })
  const slideNext = () => setState({ currentIndex: state.currentIndex + 1 })  

  return (
    <Wrapper>
      <AliceCarousel autoPlay
        items={items}
        autoPlayInterval={5000} 
        responsive={responsive}
        dotsDisabled
        buttonsDisabled
        touchTrackingEnabled
        slideToIndex={state.currentIndex}
        onSlideChanged={(e) => onSlideChanged(e)}
      />
      <Row>
        {
          thumbs &&
            items.map((item, index) => 
              <Col key={index} xs={3}>{
                <button className="thumb-btn" onClick={() => slideTo(index)}>{item}</button>}
              </Col>
            )
        }
      </Row>
      <button className="carousel-btn" onClick={slidePrev}>prev</button>
      <button className="carousel-btn next" onClick={slideNext}>next</button>
    </Wrapper>
  )
}