import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Card, Modal, Button } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import InputNumber from '../components/InputNumber'
import ProductRow from '../components/ProductRow'

export default ({ modalShow, setModalShow }) => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)
  const productId = cart.reduce((acc, product) =>
    acc = [...acc, product.codigo]
  , [])

  const queryProducts = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  console.log({queryProducts})

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

  const Number = new Intl.NumberFormat("de-DE")

  return (
    <Container>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // size="lg"
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
        {/* {
          cart.length > 0 &&
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre del producto</th>
                <th>Precio unidad</th>
                <th>Cantidad</th>
                <th>Sub total</th>
              </tr>
            </thead>
            <tbody>
              {
                cart.map((product, key) =>
                  <ProductRow key={key} product={product} />
                )  
              }
              <tr>
                <td><span>TOTAL</span></td>
                <td></td>
                <td></td>
                <td>
                  {
                    cart.reduce((acc, {cantidad}) =>
                      parseInt(acc, 10) + parseInt(cantidad, 10)
                    , 0)
                  }
                </td>
                <td>$ 
                  {
                    Number.format(cart.reduce((acc, {precio_de_venta, cantidad}) =>
                      acc + (precio_de_venta * cantidad)
                    , 0))
                  }
                </td>
                <td>
                  <button 
                    // onClick={() => {history.push(`confirmar`)}}
                  >
                    Comprar
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        } */}
    </Container>
  )
}