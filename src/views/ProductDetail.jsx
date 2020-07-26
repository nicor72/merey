import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import Breadcrumb from '../components/Breadcrumb'
import logo from './../images/merey_logo.svg'
import styled from 'styled-components'

const DetailsStyle = styled.div`
  padding-left: 3em;
  h3 {
    text-align: center;
  }
`

export default ({ match }) => {
  const dispatch = useDispatch()

  const { productId } = match.params

  const { loading, error, data } = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (loading) return <div>LOADING...</div>
  if (error) return <div>ERROR</div>
  
  const product = data.productos[0]

  return (
    <React.Fragment>
      <Breadcrumb />
      <Container fluid="md">
        <Row>
          <Col className="pb-4" xs={4}>
            <Image 
              fluid 
              src={
                product.url_fotos 
                  ? `https://lh3.googleusercontent.com/${product.url_fotos}`
                  : logo
              } 
            />
          </Col>
          
          <Col>
            <DetailsStyle>
              <h3 className="p-5">{product.nombre_de_productos}</h3>
              <p><strong>Presentación:</strong> {product.formato}</p>
              <p><strong>Precio:</strong> $ {product.precio_de_venta}</p>
              <Form inline>
                <Form.Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Label><strong>Cantidad</strong></Form.Label>
                  </Col>
                  <Col>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="light"
                      size="lg"
                      onClick={() => dispatch({type: 'ADD_PRODUCT', product})}
                    >
                      Añadir al carrito
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
              <p><strong>Origen:</strong> {product.origen}</p>
              <p><strong>Ingredientes:</strong> {product.ingredientes}</p>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Etiquetas:</strong> {product.etiquetas}</p>
            </DetailsStyle>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}