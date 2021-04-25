import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import Breadcrumb from '../components/Breadcrumb'
import Carousel from '../components/Carousel'
import logo from './../images/merey_logo.svg'
import styled from 'styled-components'
import InputNumber from '../components/InputNumber'
import Loader from '../components/Loader'

const DetailsStyle = styled.div`
  padding: 3em;
  h3 {
    text-align: center;
  }
`

export default ({ match }) => {
  const productId = parseInt(match.params.productId, 10)

  const { loading, error, data } = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (loading) return <Loader/>
  if (error) return <div>ERROR</div>

  const Number = new Intl.NumberFormat("de-DE")
  const product = data.productos[0]
  const productPhotos = product.fotos ? product.fotos.split(',') : []

  const spans = {
    xs: {
      span: 12,
      offset: 0
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

  const carouselItems = productPhotos.map((url) =>
    <img 
      src={url}
      className="sliderimg" 
      alt="banner merey"
    />
  )

  return (
    <React.Fragment>
      <Breadcrumb />
      <Container fluid="lg">
        <Row>
          <Col className="pb-4" xs={12} lg={4}>
            {
              productPhotos.length
                ? productPhotos.length > 1 
                  ? <Carousel items={carouselItems} thumbs={true} /> 
                  : <Image fluid src={productPhotos} />
                : <Image fluid src={logo} />
            }
          </Col>
          <Col>
            <DetailsStyle>
              <h3>{product.nombre}</h3>
              <h3><strong>$ {Number.format(product.precio_web)}</strong></h3>
              <InputNumber
                productCode={product.codigo}
                availables={product.cantidad_disponible}
                spans={spans}
              />
              <p><strong>Presentación: </strong>{product.formato_web} {product.variante_web}</p>
              <p><strong>Disponibles: </strong>{product.cantidad_disponible}</p>
              <p><strong>Origen:</strong> {product.origen}</p>
              <p><strong>Ingredientes:</strong> {product.ingredientes}</p>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Etiquetas:</strong> {product.etiquetas}</p>
            </DetailsStyle>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}