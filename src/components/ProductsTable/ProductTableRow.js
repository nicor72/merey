import React from 'react'
import { tableStyle } from './ProductTableConstants'

const ProductTableRow = ({
  index,
  productCart,
  productDetails,
  initProductDetails,
  getPrettyFormat,
  getPrice
}) => {

  const productState = initProductDetails(productDetails)

  return (
    <tr style={index % 2 === 0 ? { backgroundColor: 'rgba(0,0,0,.05)' } : {}}>
      <td style={tableStyle.description}>{productCart.cantidad}</td>
      <td style={tableStyle.description}>{productState.nombre}</td>
      <td style={tableStyle.description}>{productState.codigo}</td>
      <td style={tableStyle.description}>{getPrettyFormat(productCart.selectedFormatoWeb / 1000)}</td>
      <td style={tableStyle.description}>
        ${getPrice({ ...productState, selectedFormatoWeb: productCart.selectedFormatoWeb })}
      </td>
    </tr>
  )
}

export default ProductTableRow