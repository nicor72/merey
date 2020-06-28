import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'

const Footer = styled.footer`
  .container {
    padding: 5em;
  }
  .list-group-item {
    padding: 0.5em !important;
    background-color: inherit;
    color: inherit;
  }
  p {
    text-decoration: none;
  }
`

export default () =>
  <Footer>
    <Row className="bg-black">
      <Container>
        <Row>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>HORARIO</ListGroup.Item>
              <ListGroup.Item>
                Lunes a Viernes 09:00 a 21:00 HRS.
              </ListGroup.Item>
              <ListGroup.Item>
                Sábados 10:00 a 16:00 HRS.
              </ListGroup.Item>
              <ListGroup.Item>
                Domingo CERRADOS.
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>CONTACTO</ListGroup.Item>
              <ListGroup.Item>
                <a href="https://goo.gl/maps/RjqWfruGcTu" target="_blank" rel="noopener noreferrer">Avenida Apoquindo 7482</a>
              </ListGroup.Item>
              <ListGroup.Item>
                Las Condes, Santiago
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="mailto:mereytostaduria@gmail.com" target="_blank" rel="noopener noreferrer">mereytostaduria@gmail.com</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="tel:+56948826938" target="_blank" rel="noopener noreferrer">+56 9 4882 6938</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>SIGUENOS</ListGroup.Item>
              <ListGroup.Item>
                <a href="https://goo.gl/maps/RjqWfruGcTu" target="_blank" rel="noopener noreferrer">Facebook</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Row>
  </Footer>