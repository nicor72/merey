import React from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import InputNumber from '../components/InputNumber'
import styled from 'styled-components'
import { RiDeleteBin6Line } from 'react-icons/ri'

const Wrapper = styled.div`
  .align-center {
    align-items: center;
  }
  span {
    font-weight: bolder;
  }
  button {
    background-color: transparent;
    border: none;
    outline:none;
    &:hover {
      border: none;
    }
  }
`

export default ({ product }) => {
  const dispatch = useDispatch()
  const Number = new Intl.NumberFormat("de-DE")
  const subtotal = product.precio_de_venta * product.cantidad
  return (
    <Wrapper>
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
                <RiDeleteBin6Line size={32}/>
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
            <Col>
              <InputNumber
                productCode={product.codigo}
                availables={product.cantidad_disponible}
                // spans={{ xs: { span: 12, offset: 0 } }}
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
                  ? Number.format(product.precio_de_venta * product.cantidad)
                  : ''
              }
            </Col>
          </Row>
          {/* 
          {
            !isNaN(product.precio_de_venta)
              ? Number.format(product.precio_de_venta * product.cantidad)
              : ''
          }
          <button
            onClick={() => dispatch({ type: 'REMOVE_PRODUCT', productCode: product.codigo })}
          >
            Eliminar
                      </button> */}
        </Card.Body>
      </Card>
    </Wrapper>
  )
}