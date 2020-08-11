import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'

export default ({ product }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(product.cantidad)

  const Number = new Intl.NumberFormat("de-DE")

  useEffect(() => {
    setQuantity(product.cantidad)
  }, [product])

  const handleChange = (e) => {
    setQuantity(e.target.value)
    if (e.target.value >= 1 && e.target.value <= product.cantidad_disponible) {
      dispatch({type: 'UPDATE_PRODUCT', productCode: product.codigo, quantity: e.target.value})
    }
  }

  const handleBlur = (e) => {
    if (e.target.value < 1) {
      setQuantity(1)
      dispatch({type: 'UPDATE_PRODUCT', productCode: product.codigo, quantity: 1 })
    }
    if (e.target.value >= product.cantidad_disponible) {
      setQuantity(product.cantidad_disponible)
      dispatch({type: 'UPDATE_PRODUCT', productCode: product.codigo, quantity: product.cantidad_disponible })
    }
  }

  return (
    <tr>
      <td>{product.codigo}</td>
      <td>{product.nombre_de_productos}</td>
      <td>$ {Number.format(product.precio_de_venta)}</td>
      <td>
        <Form.Control 
          type="number" 
          min="0" 
          max={product.cantidad_disponible} 
          value={quantity}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e)}
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