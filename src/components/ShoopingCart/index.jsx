import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../../graphql/queries/productos'
import ProductRow from './ProductRow'

export default ({ modalShow, setModalShow }) => {
  const { cart } = useSelector((state) => state)
  const productId = cart.reduce((acc, product) =>
    acc = [...acc, product.codigo]
  , [])

  const queryProducts = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (queryProducts.data && modalShow) {
    cart.map((product) => {
      const {
        precio_de_venta,
        nombre_de_productos,
        cantidad_disponible,
        formato,
        url_fotos
      } = queryProducts.data.productos.find(({codigo}) => codigo === product.codigo)

      product.precio_de_venta = precio_de_venta
      product.nombre_de_productos = nombre_de_productos
      product.cantidad_disponible = cantidad_disponible
      product.formato = formato
      product.url_fotos = url_fotos
      
      return true
    })
  }

  const Number = new Intl.NumberFormat("de-DE")

  return (
    <Container fluid="lg">
      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        // dialogClassName="modal-90w"
        // centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Carrito de compras
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length > 0 
            ? cart.map((product, key) =>
                <ProductRow key={key} product={product} />
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
                    cart.reduce((acc, { cantidad, precio_de_venta }) =>
                      acc = acc + (cantidad * precio_de_venta)
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