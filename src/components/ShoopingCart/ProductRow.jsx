import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'
import InputNumber from '../InputNumber'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Wrapper from './Style'

export default ({ product }) => {
  const dispatch = useDispatch()
  const Number = new Intl.NumberFormat("de-DE")
  const subtotal = product.precio_de_venta * product.cantidad
  
  const spans = {
    xs: {
      span: 12,
      offset: 0
    },
    md: {
      span: 6,
      offset: 3
    },
    lg: {
      span: 6,
      offset: 3
    }
  }

  return (
    <Wrapper>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={6}>
                <p><span>{product.nombre_de_productos}</span></p>
              </Col>
              <Col>
                <p><em>{product.formato}</em></p>
              </Col>
              <Col xs={2}>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_PRODUCT', productCode: product.codigo })}
                >
                  <RiDeleteBin6Line size={24}/>
                </button>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Precio unidad:</p>
              </Col>
              <Col>
                <em>$
                {
                  !isNaN(product.precio_de_venta)
                    ? Number.format(product.precio_de_venta)
                    : '-'
                }
                </em>
              </Col>
            </Row>
            <Row className="align-center">
              <Col>
                <p>Cantidad:</p>
              </Col>
              <Col xs={8}>
                <InputNumber
                  productCode={product.codigo}
                  availables={product.cantidad_disponible}
                  spans={spans}
                  removeProduct={false}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Total:</p>
              </Col>
              <Col>$
                {
                  !isNaN(product.precio_de_venta)
                    ? Number.format(subtotal)
                    : ''
                }
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Wrapper>
  )
}