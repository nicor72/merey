import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from './../images/merey_logo.svg'
import InputNumber from '../components/InputNumber'

const CardStyle = styled.div`
  text-align: center;

  a {
    color: initial;
    &:hover {
      text-decoration: none;
    }
  }  
  
  .product-img {
    height: 15em;
    text-align: center;
    background-image: url(${props => props.url ? props.url : ''});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .product-details {
    padding: 1em;
  }
  .product-name:hover {
    text-decoration: none;
  }

  .product-name {
    font-size:  small;
  }
`

export default ({product, matchUrl}) => {
  const Number = new Intl.NumberFormat("de-DE")
  const firstPhoto = product.url_fotos ? product.url_fotos.split(',')[0] : ''

  const spans = {
    xs: {
      span: 6,
      offset: 3
    },
    md: {
      span: 6,
      offset: 3
    },
    lg: {
      span: 6,
      offset: 3
    }
  }

  return (
    <CardStyle 
      url={firstPhoto || logo}
    >
      <Link to={`${matchUrl}/${product.codigo}`}>
        <div className="product-img" />
        <div className="product-details">
          <p className="product-name">{`${product.nombre_de_productos} ${product.formato}`}</p>
          <p>{`$ ${Number.format(product.precio_de_venta)}`}</p>
        </div>
      </Link>
      <InputNumber
        productCode={product.codigo}
        availables={product.cantidad_disponible}
        spans={spans}
      />
    </CardStyle>
  )
}