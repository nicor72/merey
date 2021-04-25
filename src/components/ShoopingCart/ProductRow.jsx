import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import { RiCloseLine } from 'react-icons/ri'
import logo from '../../images/merey_logo.svg'
import Wrapper from './Style'

export default ({ product }) => {
  const dispatch = useDispatch()
  const Number = new Intl.NumberFormat("de-DE")
  const subtotal = product.precio_web * product.cantidad
  const firstPhoto = product.fotos ? product.fotos.split(',')[0] : ''
  
  // const spans = {
  //   xs: {
  //     span: 12,
  //     offset: 0
  //   },
  //   md: {
  //     span: 6,
  //     offset: 3
  //   },
  //   lg: {
  //     span: 6,
  //     offset: 3
  //   }
  // }

  return (
    <Wrapper>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col xs="10">
                <p><span>{product.nombre}</span></p>
              </Col>
              <Col xs="2">
                <button
                  onClick={() => dispatch({ type: 'REMOVE_PRODUCT', productCode: product.codigo })}
                >
                  <RiCloseLine size={16} />
                </button>
              </Col>
            </Row>
            <Row className="product-details">
              <Col>
                <Image src={firstPhoto || logo} thumbnail />
              </Col>
              <Col>
                <p><em>{product.formato_web} {product.variante_web}</em></p>
                <p>
                  <em>{product.cantidad} x {product.precio_web}</em>
                </p>
                <p>
                  Subtotal:
                  <strong>
                    ${
                      !isNaN(subtotal)
                        ? Number.format(subtotal)
                        : ''
                    }
                  </strong>
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Wrapper>
  )
}