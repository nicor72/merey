import React from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import { RiCloseLine } from 'react-icons/ri'
import logo from '../../images/merey_logo.svg'
import Wrapper from './Style'
import useProductDetails from '../../customHooks/useProductDetails'

export default ({ productCart, productDetails, setTotalPrice }) => {
  const dispatch = useDispatch()
  const Number = new Intl.NumberFormat("de-DE")
  const { productState, getPrettyFormat, getPrice } = useProductDetails(productDetails)

  React.useEffect(() => {
    if (productState) {
      setTotalPrice((current) => [
        ...current,
        {
          id: productCart.id,
          cantidad: productCart.cantidad || 0, 
          price: getPrice({ ...productState, selectedFormatoWeb: productCart.selectedFormatoWeb}) || 0
        }
      ])
    }
  }, [productState])

  return (
    <Wrapper>
      <Container>
        <Card>
          {productState &&
            <Card.Body>
              <Row>
                <Col xs="10">
                  <p><span>{productState.nombre}</span></p>
                </Col>
                <Col xs="2">
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_PRODUCT', productCode: productState.id })}
                  >
                    <RiCloseLine size={16} />
                  </button>
                </Col>
              </Row>
              <Row className="product-details">
                <Col>
                <Image src={productState.fotos ? productState.fotos.split(',')[0] : logo} thumbnail />
                </Col>
                <Col>
                  <p>
                    <em>
                      {getPrettyFormat(productCart.selectedFormatoWeb / 1000)}
                    </em>
                  </p>
                  <p>
                  <em>{productCart.cantidad} x {Number.format(getPrice({ ...productState, selectedFormatoWeb: productCart.selectedFormatoWeb }))}</em>
                  </p>
                  <p>
                    Subtotal:
                    <strong>
                      ${
                      !isNaN(getPrice({ ...productState, selectedFormatoWeb: productCart.selectedFormatoWeb }) * productCart.cantidad)
                        ? Number.format(getPrice({ ...productState, selectedFormatoWeb: productCart.selectedFormatoWeb }) * productCart.cantidad)
                          : ''
                      }
                    </strong>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          }
        </Card>
      </Container>
    </Wrapper>
  )
}