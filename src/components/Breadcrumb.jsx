import React from 'react'
import styled from 'styled-components'
import { Breadcrumb } from 'react-bootstrap'
import { useParams } from "react-router-dom"

const BreadcrumbWrapper = styled.div`
  ol {
    background-color: transparent;
  }  
  a {
    color: black;
  }
`

export default () => {
  let { deparment, productId } = useParams();
  return (
    <BreadcrumbWrapper>
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
        {/* {
          product &&
            <Breadcrumb.Item 
              href={`/productos/${deparment}/${product}`}
              active
            >
              {product}
            </Breadcrumb.Item>
        } */}
      </Breadcrumb>
    </BreadcrumbWrapper>
  )
}