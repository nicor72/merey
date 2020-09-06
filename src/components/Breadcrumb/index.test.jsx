import React from 'react'
import { render } from '@testing-library/react'
import { Route, MemoryRouter } from 'react-router-dom'
import Breadcrumb from './index'

test('expects active department', () => {
  const { container, getByText } = render(
    <MemoryRouter initialEntries={["/productos/ABARROTES"]}>
      <Route path="/productos/:deparment">
        <Breadcrumb/>
      </Route>
    </MemoryRouter>
  )
  expect(getByText('INICIO')).toBeTruthy()
  expect(getByText('ABARROTES')).toBeTruthy()
  expect(container.querySelector('.active')).toBeTruthy()
})

test('expects desactive department', () => {
  const { container, getByText } = render(
    <MemoryRouter initialEntries={["/productos/ABARROTES/1234"]}>
      <Route path="/productos/:deparment/:productId">
        <Breadcrumb />
      </Route>
    </MemoryRouter>
  )
  expect(getByText('INICIO')).toBeTruthy()
  expect(getByText('ABARROTES')).toBeTruthy()
  expect(container.querySelector('.active')).toBeFalsy()
})