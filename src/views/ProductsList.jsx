import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCTS_BY_DEPARTMENT } from '../graphql/queries/productos'
import { Container, Row, Col } from 'react-bootstrap'
import Breadcrumb from '../components/Breadcrumb'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

export default ({ match }) => {
  const { deparment } = match.params

  const { loading, error, data } = useQuery(PRODUCTS_BY_DEPARTMENT, { variables: { deparment } })

  if (loading) return <Loader/>
  if (error) return <div>ERROR</div>

  return (
    <React.Fragment>
      <Breadcrumb />
      <Container fluid="lg">
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