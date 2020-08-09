import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import ProductRow from '../components/ProductRow'

export default () => {
  let history = useHistory()

  const { cart } = useSelector((state) => state)
  const productId = cart.reduce((acc, product) =>
    acc = [...acc, product.codigo]
  , [])

  const { loading, error, data } = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  // if (loading) return <div>LOADING...</div>
  // if (error) return <div>ERROR</div>
  if (data) {
    cart.map((product) => {
      product.precio_de_venta = data.productos.find(
        ({codigo}) => codigo === product.codigo
      ).precio_de_venta
      product.nombre_de_productos = data.productos.find(
        ({codigo}) => codigo === product.codigo
      ).nombre_de_productos
    })
  }

  // data.productos.map((product) => {
  //   return product.cantidad = cart.find(({codigo}) => codigo === product.codigo).cantidad
  // })

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