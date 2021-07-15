import React from 'react'
import ProductTableRow from './ProductTableRow'
import { tableStyle, shippingCosts } from './ProductTableConstants'
import useProductDetails from '../../customHooks/useProductDetails'

const ProductsTable = ({ cart, productsDetails, shippingData, totalPrice }) => {
  const { initProductDetails, getPrettyFormat, getPrice } = useProductDetails()

  return (
    <React.Fragment>
      <table style={tableStyle.main}>
        <thead>
          <tr>
            <th style={tableStyle.header}>Cantidad</th>
            <th style={tableStyle.header}>Producto</th>
            <th style={tableStyle.header}>Código</th>
            <th style={tableStyle.header}>Formato</th>
            <th style={tableStyle.header}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((productCart, key) =>
            <ProductTableRow
              key={key}
              index={key}
              productCart={productCart}
              productDetails={productsDetails.find(({ id }) => id === productCart.id)}
              initProductDetails={initProductDetails}
              getPrettyFormat={getPrettyFormat}
              getPrice={getPrice}
            />
          )}
        </tbody>
      </table>
      <ul style={tableStyle.list}>
        <li>Productos: ${totalPrice}</li>
        <li>Envio {shippingData.express ? 'Express por Calcular' : `${shippingData.commune}: $${shippingCosts[shippingData.commune]}`}</li>
        <li>Descuentos: ------</li>
        <li style={{ fontWeight: 'bolder' }}>
          Total: ${(totalPrice + (shippingData.express ? 0 : shippingCosts[shippingData.commune]))}
        </li>
      </ul>
    </React.Fragment>
  )
}

export default ProductsTable