import React, { useState,useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import Breadcrumb from '../components/Breadcrumb'
import Carousel from '../components/Carousel'
import logo from './../images/merey_logo.svg'
import styled from 'styled-components'

const DetailsStyle = styled.div`
  padding-left: 3em;
  h3 {
    text-align: center;
  }
`

export default ({ match }) => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)
  
  const productId = parseInt(match.params.productId, 10)

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const productExist = cart.find(product => product.codigo === productId)
    setQuantity(productExist ? productExist.cantidad : 0)
  }, [cart])

  const { loading, error, data } = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (loading) return <div>LOADING...</div>
  if (error) return <div>ERROR</div>

  const Number = new Intl.NumberFormat("de-DE")
  const product = data.productos[0]
  const productPhotos = product.url_fotos ? product.url_fotos.split(',') : []

  const handleChange = (e) => {
    const type = e.target.value > 0 ? 'UPDATE_PRODUCT' : 'REMOVE_PRODUCT'
    dispatch({type, productCode: product.codigo, quantity: e.target.value})
    
    setQuantity(e.target.value)
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
      <Container fluid="md">
        <Row>
          <Col className="pb-4" xs={12} sm={4}>
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
              <p><strong>Precio:</strong> $ {Number.format(product.precio_de_venta)}</p>          
              {
                quantity === 0
                ? <Button
                    variant="light"
                    size="lg"
                    onClick={() => dispatch({type: 'ADD_PRODUCT', productCode: product.codigo})}
                  >
                    Añadir al carrito
                  </Button> 
                : <Form inline>
                    <Form.Row className="align-items-center"> 
                      <Col xs="auto">
                        <Form.Label><strong>Cantidad</strong></Form.Label>
                      </Col>
                      <Col xs="auto"> 
                        <Form.Control 
                          type="number" 
                          min="0" 
                          max="100" 
                          value={quantity}
                          onChange={(e) => handleChange(e)}
                        />
                      </Col>
                    </Form.Row>
                  </Form>
              }
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