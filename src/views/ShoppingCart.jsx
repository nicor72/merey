import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import ProductRow from '../components/ProductRow'

export default () => {
  const { cart } = useSelector((state) => state)
  const productId = cart.reduce((acc, product) =>
    acc = [...acc, product.codigo]
  , [])

  const queryProducts = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (queryProducts.data) {
    cart.map((product) => {
      const {
        precio_de_venta,
        nombre_de_productos,
        cantidad_disponible
      } = queryProducts.data.productos.find(({codigo}) => codigo === product.codigo)

      product.precio_de_venta = precio_de_venta
      product.nombre_de_productos = nombre_de_productos
      product.cantidad_disponible = cantidad_disponible
      
      return true
    })
  }

  const Number = new Intl.NumberFormat("de-DE")

  return (
    <Container>
      <div>SHOPPING CART</div>
        {
          cart.length > 0 &&
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre del producto</th>
                <th>Precio Unidad</th>
                <th>Cantidad</th>
                <th>Total</th>
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
        }
    </Container>
  )
}