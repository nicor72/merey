import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../../graphql/queries/productos'
import Loader from '../Loader'
import ProductRow from './ProductRow'

export default ({ modalShow, setModalShow }) => {
  const Number = new Intl.NumberFormat("de-DE")

  const [totalPrice, setTotalPrice] = React.useState([])

  const { cart } = useSelector((state) => state)
  const productId = cart.reduce((acc, product) =>
    acc = [...acc, product.id]
  , [])

  const {data, loading, error} = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (error) return <div>ERROR</div>

  return (
    <Container fluid="lg">
      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Carrito de compras
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loader />}
          {data && cart.length > 0
            ? cart.map((productCart, key) =>
                <ProductRow 
                  key={key} 
                  productCart={productCart}
                  productDetails={data.productos.find(({ id }) => id === productCart.id)}
                  setTotalPrice={setTotalPrice}
                />
              )
            : <div className="text-center">
                <p>¿Aún no encuentras lo que buscas?</p>
                <Button variant="light" type="button" onClick={() => setModalShow(false)}>
                  Seguir Comprando
                </Button>
              </div>
          }
        </Modal.Body>
          {cart.length > 0 &&
            <Modal.Footer style={{ justifyContent: 'space-around' }}>
              <strong>
                Total ${
                  Number.format(
                    // cart.reduce((acc, { cantidad, precio_venta }) =>
                    //   acc = acc + (cantidad * precio_venta)
                    // , 0)
                    totalPrice.reduce((acc, { cantidad, price }) =>
                      acc = acc + (cantidad * price)
                    , 0)
                  )
                }
              </strong>
              <Link to="/confirmar" onClick={() => setModalShow(false)}>
                <Button variant="info" type="button">Comprar</Button>
              </Link>
            </Modal.Footer>
          }
      </Modal>
    </Container>
  )
}