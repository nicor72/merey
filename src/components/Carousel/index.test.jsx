import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Carousel from './index'

const items = [<img
  className="sliderimg"
  alt="banner merey"
/>]

test('expect tumbs buttons', () => {
  const { container } = render(<Carousel items={items} thumbs={true}/>)
  fireEvent.click(container.querySelector('.thumb-btn'))
  expect(container.querySelector('.thumb-btn')).toBeTruthy()
})

test('expect arrows', () => {
  const { container } = render(<Carousel items={items} arrows={true} />)
  
  fireEvent.click(container.querySelector('.carousel-btn'))
  expect(container.querySelector('.carousel-btn')).toBeTruthy()
  
  fireEvent.click(container.querySelector('.next'))
  expect(container.querySelector('.next')).toBeTruthy()
})