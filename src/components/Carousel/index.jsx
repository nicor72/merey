import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Row, Col } from 'react-bootstrap'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import Wrapper from './Style'

export default ({ items, responsive, thumbs = false, arrows = true}) => {

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
      {
        arrows &&
        <React.Fragment>
          <button className="carousel-btn" onClick={slidePrev}>
            <RiArrowLeftSLine/>
          </button>
          <button className="carousel-btn next" onClick={slideNext}>
            <RiArrowRightSLine />
          </button>
        </React.Fragment>
      }
    </Wrapper>
  )
}