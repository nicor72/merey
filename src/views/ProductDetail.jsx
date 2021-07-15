import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import Breadcrumb from '../components/Breadcrumb'
import Carousel from '../components/Carousel'
import logo from './../images/merey_logo.svg'
import InputNumber from '../components/InputNumber'
import Loader from '../components/Loader'
import useProductDetails from '../customHooks/useProductDetails'

const Number = new Intl.NumberFormat("de-DE")

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

export default ({ match }) => {
  const productId = match.params.productId
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(PRODUCT_BY_ID, { variables: { productId } })
  const { productState, setProductState, getPrettyFormat } = useProductDetails(data ? data.productos[0] : null)

  if (error) return <div><p>No se encontró el producto</p></div>
  if (loading) return <Loader />

  return (
    <React.Fragment>
      <Breadcrumb />
      {productState ?
        <Container fluid="lg">
          <Row className="p-3">
            <Col className="pb-4" xs={12} lg={4}>
              {productState.productPhotos ?
                productState.productPhotos.length > 1 ?
                  <Carousel 
                    thumbs={true} 
                    items={productState.productPhotos.map(url =>
                      <img
                        src={url}
                        className="sliderimg"
                        alt="banner merey"
                      />
                    )}
                  /> : 
                  <Image 
                    fluid 
                    src={productState.productPhotos}
                    onClick={() => window.open(productState.productPhotos, '_blank').focus()}
                    style={{ cursor: "pointer" }} 
                  /> : 
                <Image fluid src={logo} />
              }
            </Col>
            <Col>
              <h3 className="text-center">{productState.nombre}</h3>
              <h3 className="text-center">
                <strong>$ {Number.format(productState.price)}</strong>
              </h3>
              <InputNumber
                product={productState}
                spans={spans}
              />
              <p>
                <strong>
                  Presentación:{' '}
                </strong>
                {productState.formatosWeb.length > 1 ?
                  <Form.Control
                    as="select"
                    name="format"
                    value={productState.selectedFormatoWeb}
                    onChange={(e) => {
                      e.persist()
                      setProductState((current) => ({
                        ...current,
                        selectedFormatoWeb: e.target.value,
                        price: ((current.precioVenta / 1000) * e.target.value)
                      }))
                      dispatch({ 
                        type: 'UPDATE_SELECTED_FORMAT', 
                        productCode: productState.id,
                        selectedFormatoWeb: e.target.value
                      })
                    }}
                  >
                    {productState.formatosWeb.map((formato, key) =>
                      <option key={key} value={formato.trim()}>
                        {getPrettyFormat(formato / 1000)}
                      </option>
                    )}
                  </Form.Control> :
                  productState.prettyFormat
                }
              </p>
              <p><strong>Disponibles: </strong>{productState.cantidad_disponible}</p>
              <p><strong>Origen:</strong> {productState.origen}</p>
              <p><strong>Ingredientes:</strong> {productState.ingredientes}</p>
              <p><strong>Descripción:</strong> {productState.descripcion}</p>
              <p><strong>Etiquetas:</strong> {productState.etiquetas}</p>
            </Col>
          </Row>
        </Container> :
        <p>No se encontró el producto</p>
      }
    </React.Fragment>
  )
}