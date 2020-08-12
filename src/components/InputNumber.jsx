import React, { useState, useEffect } from 'react'
import { Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div`
  button, input {
    text-align: center;
    font-weight: 700;
  }
  input, .col {
    padding: 0;
  }
  .button {
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    margin: 0;
    outline: none;
    padding: 10px;
  }
  input[type="button"] {
    -webkit-appearance: button;
    cursor: pointer;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .input-group {
    clear: both;
    margin: 15px 0;
    position: relative;
  }

  .input-group input[type='button'] {
    background-color: #eeeeee;
    min-width: 38px;
    width: auto;
    transition: all 300ms ease;
  }

  .input-group .button-minus,
  .input-group .button-plus {
    font-weight: bold;
    height: 38px;
    padding: 0;
    width: 38px;
    position: relative;
  }
`

export default ({ productCode, availables, spans, removeProduct = true }) => {
  if (!spans) {
    spans = {
      xs: {
        span: 10,
        offset: 0
      },
      md: {
        span: 3,
        offset: 0
      },
      lg: {
        span: 5,
        offset: 0
      }
    }
  }

  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const productExist = cart.find(productCart => productCart.codigo === parseInt(productCode))
    setQuantity(productExist ? productExist.cantidad : 0)
  }, [cart])

  const handleUpdate = (e, type) => {
    let newQuantity = 0
    
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
      if (newQuantity >= availables) {
        newQuantity = availables
      }
    }
    
    setQuantity(newQuantity)
    dispatch({type: 'UPDATE_PRODUCT', productCode, quantity: newQuantity })
  }

  const handleChange = (e) => {
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
    if (e.target.value >= availables) {
      setQuantity(availables)
      dispatch({type: 'UPDATE_PRODUCT', productCode, quantity: availables })
    }
  }

  return (
    <Wrapper>
      {
        availables
        ? quantity === 0
          ? <Button
              variant="light"
              size="md"
              onClick={() => dispatch({type: 'ADD_PRODUCT', productCode})}
            >
              Añadir al carrito
            </Button>
          : <Col className="col" xs={spans.xs} md={spans.md} lg={spans.lg}>
              <div className="input-group">
                <input 
                  type="button"
                  value="-" 
                  class="button button-minus" 
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
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
                <input
                  type="button"
                  value="+"
                  class="button button-minus"
                  onClick={(e) => handleUpdate(e, 'increment')}
                />
              </div>
            </Col>
        : <p>Agotado</p>
      }
    </Wrapper>
  )
}