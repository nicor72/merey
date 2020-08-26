import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Wrapper from './Style'

export default () => {
  let { deparment, productId } = useParams()
  return (
    <Wrapper>
      <Breadcrumb>
        <Breadcrumb.Item href="/">INICIO</Breadcrumb.Item>
        <Breadcrumb.Item href="/productos">
          PRODUCTOS
        </Breadcrumb.Item>
        {
          deparment &&
            <Breadcrumb.Item 
              href={`/productos/${deparment}`}
              active={productId ? false : true}
            >
              {deparment}
            </Breadcrumb.Item>
        }
      </Breadcrumb>
    </Wrapper>
  )
}