import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from '@apollo/react-hooks'
import { HIGHTLIGHTS_PRODUCTS } from '../graphql/queries/productos'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

export default () => {
  const { loading, error, data } = useQuery(HIGHTLIGHTS_PRODUCTS)
  if (loading) return <Loader/>
  if (error) return <div>ERROR</div>

  const highlightsItems = data.productos.map((product, key) =>
    <Col key={key} xs={12} className="pb-4">
      <ProductCard 
        product={product} 
        matchUrl={`productos/${product.departamentoProducto.nombre}`}
      />
    </Col>
  )

  const responsive = {
    0: {
        items: 1,
    },
    1024: {
        items: 4
    }
  }
  
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <h3 className="p-5">PRODUCTOS DESTACADOS</h3>
      </Row>
      <Carousel items={highlightsItems} responsive={responsive}/>
    </Container>
  )
}