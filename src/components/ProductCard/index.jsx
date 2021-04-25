import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/merey_logo.svg'
import InputNumber from '../InputNumber'
import Wrapper from './Style'

export default ({product, matchUrl}) => {
  const Number = new Intl.NumberFormat("de-DE")
  const firstPhoto = product.fotos ? product.fotos.split(',')[0] : ''

  const spans = {
    xs: {
      span: 8,
      offset: 2
    },
    md: {
      span: 8,
      offset: 2
    },
    lg: {
      span: 8,
      offset: 2
    }
  }

  return (
    <Wrapper url={firstPhoto || logo}>
      <Link to={`${matchUrl}/${product.codigo}`}>
        <div className="product-img" />
        <div className="product-details">
          <p className="product-name">{`${product.nombre} ${product.formato_web} ${product.variante_web}`}</p>
          <p>{`$ ${Number.format(product.precio_web)}`}</p>
        </div>
      </Link>
      <InputNumber
        productCode={product.codigo}
        availables={product.cantidad_disponible}
        spans={spans}
      />
    </Wrapper>
  )
}