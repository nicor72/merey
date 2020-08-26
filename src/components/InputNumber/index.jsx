import React, { useState, useEffect } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from './Style'

export default ({ productCode, availables, spans, removeProduct = true }) => {
  if (!spans) {
    spans = {
      xs: {
        span: 12,
        offset: 0
      },
      md: {
        span: 12,
        offset: 0
      },
      lg: {
        span: 12,
        offset: 0
      }
    }
  }

  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)

  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    const productExist = cart.find(productCart => productCart.codigo === parseInt(productCode))
    setQuantity(productExist ? productExist.cantidad : 0)
  }, [cart])

  const handleUpdate = (e, type) => {
    let newQuantity = 0
    let error = ''
    
    if (type === 'decrement') {
      newQuantity = quantity - 1
      if (newQuantity < 1) {
        if (removeProduct) {
          dispatch({type: 'REMOVE_PRODUCT', productCode })
          return
        } else {
          newQuantity = 1
        }
      }
    }

    if (type === 'increment') {
      newQuantity = quantity + 1
      if (newQuantity > availables) {
        newQuantity = availables
        error = 'error'
      }
    }
    
    setError(error)
    setQuantity(newQuantity)
    dispatch({type: 'UPDATE_PRODUCT', productCode, quantity: newQuantity })
  }

  const handleChange = (e) => {
    setError('')
    setQuantity(e.target.value)
    if (e.target.value >= 1 && e.target.value <= availables) {
        dispatch({type: 'UPDATE_PRODUCT', productCode, quantity: e.target.value})
    }
  }

  const handleBlur = (e) => {
    if (e.target.value < 1) {
      if (removeProduct) {
        dispatch({type: 'REMOVE_PRODUCT', productCode })
      } else {
        setQuantity(1)
        dispatch({type: 'UPDATE_PRODUCT', productCode, quantity: 1 })
      }
    }
    if (e.target.value > availables) {
      setError('error')
      setQuantity(availables)
      dispatch({type: 'UPDATE_PRODUCT', productCode, quantity: availables })
    }
  }

  return (
    <Wrapper>
      <Col className="col" xs={spans.xs} md={spans.md} lg={spans.lg}>
      {
        availables
        ? quantity === 0
          ? <Button
              variant="light"
              size="lg"
              onClick={() => dispatch({type: 'ADD_PRODUCT', productCode})}
            >
              Añadir al carrito
            </Button>
          : <div className={`input-group ${error}`}>
              <input 
                type="button"
                value="-" 
                className="button button-minus" 
                onClick={(e) => handleUpdate(e, 'decrement')}
              />
              <Form.Control 
                type="number" 
                min="0" 
                max={availables} 
                value={quantity}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              />
              <input
                type="button"
                value="+"
                className="button button-minus"
                onClick={(e) => handleUpdate(e, 'increment')}
              />
              <p><em>Disponibles {availables} unidades</em></p>
            </div>
        : <p>Agotado</p>
      }
      </Col>
    </Wrapper>
  )
}