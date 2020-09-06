import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import InputNumber from './index'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

let store

beforeEach(() => {
  store = mockStore({
    cart: [{ codigo: 4259, cantidad: 1 }]
  })
  store.dispatch = jest.fn()
})


test('expect buy button and add product', () => {
  const { container, getByText } = render(
    <Provider store={store}>
      <InputNumber productCode={4260} availables={10}/>
    </Provider>
  )

  expect(container.querySelector('button')).toBeTruthy()
  expect(getByText('Añadir al carrito')).toBeTruthy()
  fireEvent.click(getByText('Añadir al carrito'))
  expect(store.dispatch).toHaveBeenCalledTimes(1)
  expect(store.dispatch).toHaveBeenCalledWith({ productCode: 4260, type: "ADD_PRODUCT" })
})

test('expect not available', () => {

  const { container, getByText } = render(
    <Provider store={store}>
      <InputNumber />
    </Provider>
  )

  expect(container.querySelector('button')).toBeTruthy()
  expect(container.querySelector('button').disabled).toBeTruthy()
  expect(getByText('Agotado')).toBeTruthy()
})

test('expect input number, increase and decrase quantity', () => {

  const { container } = render(
    <Provider store={store}>
      <InputNumber productCode={4259} availables={10} />
    </Provider>
  )

  expect(container.querySelector('input[type="number"]')).toBeTruthy()
  expect(container.querySelector('input[type="number"]').value).toBe('1')
  fireEvent.click(container.querySelector('input[value="+"]'))
  expect(container.querySelector('input[type="number"]').value).toBe('2')
  fireEvent.click(container.querySelector('input[value="-"]'))
  expect(container.querySelector('input[type="number"]').value).toBe('1')
  fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '5' } })
  expect(container.querySelector('input[type="number"]').value).toBe('5')
})


test('expect not availables error', () => {

  const { container } = render(
    <Provider store={store}>
      <InputNumber productCode={4259} availables={10} />
    </Provider>
  )

  container.querySelector('input[type="number"]').focus()
  fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '20' } })
  container.querySelector('input[type="number"]').blur()
  expect(container.querySelector('input[type="number"]').value).toBe('10')
  expect(container.querySelector('.error')).toBeTruthy()
  fireEvent.click(container.querySelector('input[value="+"]'))
  expect(container.querySelector('.error')).toBeTruthy()
  fireEvent.click(container.querySelector('input[value="-"]'))
  expect(container.querySelector('.error')).toBeFalsy()
})

test('expect remove product', () => {

  const { container } = render(
    <Provider store={store}>
      <InputNumber productCode={4259} availables={10} />
    </Provider>
  )

  fireEvent.click(container.querySelector('input[value="-"]'))
  expect(store.dispatch).toHaveBeenCalledTimes(1)
  container.querySelector('input[type="number"]').focus()
  fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '0' } })
  container.querySelector('input[type="number"]').blur()
  expect(store.dispatch).toHaveBeenCalledTimes(2)
  expect(store.dispatch).toHaveBeenCalledWith({ productCode: 4259, type: "REMOVE_PRODUCT" })
})

test('expect not remove product', () => {

  const { container } = render(
    <Provider store={store}>
      <InputNumber productCode={4259} availables={10} removeProduct={false}/>
    </Provider>
  )

  fireEvent.click(container.querySelector('input[value="-"]'))
  container.querySelector('input[type="number"]').focus()
  fireEvent.change(container.querySelector('input[type="number"]'), { target: { value: '0' } })
  container.querySelector('input[type="number"]').blur()
  expect(store.dispatch).toHaveBeenCalledTimes(2)
  expect(store.dispatch).toHaveBeenCalledWith({ type: 'UPDATE_PRODUCT', productCode: 4259, quantity: 1 })
})