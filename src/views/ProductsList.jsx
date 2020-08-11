import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCTS_BY_DEPARTMENT } from '../graphql/queries/productos'
import { Container, Row, Col, Toast } from 'react-bootstrap'
import Breadcrumb from '../components/Breadcrumb'
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

const ToastWrapper = styled.div`
  position: fixed;
  top: 2em;
  right: 2em;
  z-index: 1;
`

export default ({ match }) => {
  const [toast, setToast] = useState([]);

  const { deparment } = match.params

  const { loading, error, data } = useQuery(PRODUCTS_BY_DEPARTMENT, { variables: { deparment } })

  if (loading) return <Loader/>
  if (error) return <div>ERROR</div>

  const renderToast = (toast) => {
    return (
      <ToastWrapper>
        {
          toast.map(({nombre_de_productos}, i) =>
              <Toast
                key={i}
                onClose={() => setToast([])} 
                show={toast ? true : false} 
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <strong className="mr-auto">Merey</strong>
                  <small>Hace 1 segundo</small>
                </Toast.Header>
                <Toast.Body>{`Woohoo, se agregó correctamente el producto ${nombre_de_productos}!`}</Toast.Body>
              </Toast>  
          )
        }
      </ToastWrapper>
    )
  }

  return (
    <React.Fragment>
      <Breadcrumb />
      <Container fluid="lg">
      {toast && renderToast(toast)}
        <Row>
          {
            data.productos.map((product, key) =>
              <Col key={key} xs={12} md={6} lg={3} className="pb-4">
                <ProductCard product={product} matchUrl={match.url}/>
              </Col>
            )
          }
        </Row>
      </Container>
    </React.Fragment>
  )
}