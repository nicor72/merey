import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import Breadcrumb from '../components/Breadcrumb'
import Carousel from '../components/Carousel'
import logo from './../images/merey_logo.svg'
import styled from 'styled-components'
import InputNumber from '../components/InputNumber'

const DetailsStyle = styled.div`
  padding: 3em;
  h3 {
    text-align: center;
  }
`

export default ({ match }) => {
  const productId = parseInt(match.params.productId, 10)

  const { loading, error, data } = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (loading) return <div>LOADING...</div>
  if (error) return <div>ERROR</div>

  const Number = new Intl.NumberFormat("de-DE")
  const product = data.productos[0]
  const productPhotos = product.url_fotos ? product.url_fotos.split(',') : []

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
              ? <Carousel items={carouselItems} thumbs={true}/>
              : <Image fluid src={logo} />
            }
          </Col>
          <Col>
            <DetailsStyle>
              <h3 className="p-5">{product.nombre_de_productos}</h3>
              <p><strong>Presentación: </strong>{product.formato}</p>
              <p><strong>Precio: </strong>$ {Number.format(product.precio_de_venta)}</p>       
              <p><strong>Disponibles: </strong>{product.cantidad_disponible}</p>
              <p><strong>Cantidad: </strong></p>     
              <p><strong>Origen:</strong> {product.origen}</p>
              <p><strong>Ingredientes:</strong> {product.ingredientes}</p>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Etiquetas:</strong> {product.etiquetas}</p>
              <InputNumber
                productCode={product.codigo}
                availables={product.cantidad_disponible}
              />
            </DetailsStyle>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}