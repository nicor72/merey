import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Container, Row, Col, Button, Toast } from 'react-bootstrap'
import { PRODUCTS_BY_DEPARTMENT } from '../graphql/queries/productos'
import { useDispatch } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import logo from './../images/merey_logo.svg'
import styled from 'styled-components'

const ProductCard = styled.div`
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
  
  button {
    text-align: center;
    font-weight: 700;
  }
`

export default ({ match }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const { deparment } = match.params

  const { loading, error, data } = useQuery(PRODUCTS_BY_DEPARTMENT, { variables: { deparment } })

  if (loading) return <div>LOADING...</div>
  if (error) return <div>ERROR</div>

  return (
    <React.Fragment>
      <Breadcrumb />
      <Container fluid>    
        <Row>
          {
            data.productos.map((product, i) =>
              <Col key={i} xs={12} sm={4} md={3} lg={2} className="pb-4">
                <ProductCard 
                    url={
                      product.url_fotos 
                        ? `https://lh3.googleusercontent.com/${product.url_fotos}`
                        : logo
                    }
                  >
                  <Link to={`${match.url}/${product.codigo}`}>
                    <div className="product-img" />
                    <div className="product-details">
                      <p className="product-name">{`${product.nombre_de_productos} ${product.formato}`}</p>
                      <p>{`$ ${product.precio_de_venta}`}</p>
                    </div>
                  </Link>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => {
                        dispatch({type: 'ADD_PRODUCT', product})
                        setShow(true)
                      }}
                    >
                      Añadir al carrito
                    </Button>
                </ProductCard>
              </Col>
            )
          }
        </Row>
        
        <Col xs={6}>
          <Toast onClose={() => setShow(false)} show={show} delay={3000}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </Col>
      </Container>
    </React.Fragment>
  )
}