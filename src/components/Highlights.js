import React from 'react'
import { Container, Row, Col, CardDeck, Card, Button } from 'react-bootstrap'

export default () => {
  const productsLenght = 6

  let products = []
  for (var i = 0; i < productsLenght; i++) {
    products.push(i)
  }
  
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <h3 className="p-5">PRODUCTOS DESTACADOS</h3>
      </Row>
      <Row className="justify-content-md-center">
        <CardDeck>
          {
            products.map((i) =>
              <Col key={i} xs={3} className="pb-4">
                <Card border="light">
                  <Card.Img variant="top" src="https://scontent.fscl11-2.fna.fbcdn.net/v/t1.0-9/46493666_180939976190267_2553519092975796224_n.jpg?_nc_cat=102&_nc_sid=2d5d41&_nc_oc=AQkZqjSgHHWbsB4p0D02e31J_ZMDRwlFYHaow04gL6rWyeV4IUJI3g-v8q-8B7oS0eU&_nc_ht=scontent.fscl11-2.fna&oh=a5f161eb5d5dd4a909da93079f35d1d4&oe=5F1E47B1" />
                  <Card.Body className="text-center">
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Button variant="light">Añadir al carrito</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          }
      </CardDeck>
      </Row>
    </Container>
  )
}