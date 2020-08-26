import React from 'react'
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
        formato
      } = queryProducts.data.productos.find(({codigo}) => codigo === product.codigo)

      product.precio_de_venta = precio_de_venta
      product.nombre_de_productos = nombre_de_productos
      product.cantidad_disponible = cantidad_disponible
      product.formato = formato
      
      return true
    })
  }

  return (
    <Container fluid="lg">
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Carrito de compras
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Productos</h4>
          {
            cart.length > 0 &&
              cart.map((product, key) =>
                <ProductRow key={key} product={product} />
              ) 
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}