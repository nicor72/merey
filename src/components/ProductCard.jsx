import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { Row, Col, Button } from 'react-bootstrap'
import styled from 'styled-components'
import logo from './../images/merey_logo.svg'

const CardStyle = styled.div`
  text-align: center;

  a {
    color: initial;
    &:hover {
      text-decoration: none;
    }
  }  
  
  .product-img {
    height: 15em;
    text-align: center;
    background-image: url(${props => props.url ? props.url : ''});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .product-details {
    padding: 1em;
  }
  .product-name:hover {
    text-decoration: none;
  }

  .product-name {
    font-size:  small;
  }
  
  button, input {
    text-align: center;
    font-weight: 700;
  }
`

export default ({product, matchUrl}) => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)
  const [quantity, setQuantity] = useState(0)

  const Number = new Intl.NumberFormat("de-DE")
  const firstPhoto = product.url_fotos ? product.url_fotos.split(',')[0] : ''

  useEffect(() => {
    const productExist = cart.find(productCart => productCart.codigo === parseInt(product.codigo))
    setQuantity(productExist ? productExist.cantidad : 0)
  }, [cart])

  const handleChange = (e) => {
    const type = e.target.value > 0 ? 'UPDATE_PRODUCT' : 'REMOVE_PRODUCT'
    dispatch({type, productCode: product.codigo, quantity: e.target.value})
    setQuantity(e.target.value)
  }

  return (
    <CardStyle 
      url={firstPhoto || logo}
    >
      <Link to={`${matchUrl}/${product.codigo}`}>
        <div className="product-img" />
        <div className="product-details">
          <p className="product-name">{`${product.nombre_de_productos} ${product.formato}`}</p>
          <p>{`$ ${Number.format(product.precio_de_venta)}`}</p>
        </div>
      </Link>
      {
        product.cantidad_disponible
        ? quantity === 0 
          ? <Button
              variant="light"
              size="md"
              onClick={() => dispatch({type: 'ADD_PRODUCT', productCode: product.codigo})}
            >
              Añadir al carrito
            </Button>
          : <Row className="justify-content-md-center">
              <Col xs={12} sm={2} md={2} lg={4}>
                <Form.Control 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={quantity}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
            </Row>
        : <p>Agotado</p>
      }
    </CardStyle>
  )
}