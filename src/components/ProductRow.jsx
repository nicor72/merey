import React from 'react'
import { useDispatch } from 'react-redux'
import InputNumber from '../components/InputNumber'

export default ({ product }) => {
  const dispatch = useDispatch()
  const Number = new Intl.NumberFormat("de-DE")

  return (
    <tr>
      <td>{product.codigo}</td>
      <td>{product.nombre_de_productos}</td>
      <td>$ {Number.format(product.precio_de_venta)}</td>
      <td>
        <InputNumber
          productCode={product.codigo}
          availables={product.cantidad_disponible}
          spans={{xs: {span: 12, offset: 0}}}
          removeProduct={false}
        />
      </td>
      <td>$ {Number.format(product.precio_de_venta * product.cantidad)}</td>
      <td>
        <button 
          onClick={() => dispatch({type: 'REMOVE_PRODUCT', productCode: product.codigo})}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}