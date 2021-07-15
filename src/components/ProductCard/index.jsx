import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Col, Button } from 'react-bootstrap'
import logo from '../../images/merey_logo.svg'
import InputNumber from '../InputNumber'
import Wrapper from './Style'
import useProductDetails from '../../customHooks/useProductDetails'

const Number = new Intl.NumberFormat("de-DE")

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

export default ({ product, matchUrl }) => {
  let history = useHistory()
  const { productState, initProductDetails } = useProductDetails()

  React.useEffect(() => {
    initProductDetails(product)
  }, [])

  return (
    productState &&
      <Wrapper url={productState.productPhotos[0] || logo}>
        <Link to={`${matchUrl}/${productState.id}`}>
          <div className="product-img" />
          <div className="product-details">
            <p className="product-name">{productState.nombre}</p>
            <p className="product-name">{productState.prettyFormat}</p>
            <p>{`$ ${Number.format(productState.price)}`}</p>
          </div>
        </Link>
        {productState.formatosWeb.length > 1 ?
          <Col 
            className="p-3" xs={spans.xs} md={spans.md} lg={spans.lg}>
            <Button
              variant="light"
              size="md"
              style={{ fontWeight: '700' }}
              onClick={() => history.push(`${matchUrl}/${productState.id}`)}
            >
              Seleccionar formato
            </Button>
          </Col> : 
          <InputNumber
            product={productState}
            spans={spans}
          />
        }
      </Wrapper>
  )
}