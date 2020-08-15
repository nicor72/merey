import React from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import instagram from './../images/logo-de-instagram.svg'
import facebook from './../images/facebook-logo.svg'

const Footer = styled.footer`
  flex-shrink: 0;
  .container {
    padding: 5em;
  }
  .list-group {
    margin-bottom: 2em;
  }  
  .list-group-item {
    padding: 0 !important;
    background-color: inherit;
    color: inherit;
  }
  p {
    text-decoration: none;
  }
`

export default () =>
  <Footer>
    <div className="bg-black">
      <Container>
        <Row>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item><span>HORARIO</span></ListGroup.Item>
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
              <ListGroup.Item><span>CONTACTO</span></ListGroup.Item>
              <ListGroup.Item>
                <a href="tel:+56948826938" target="_blank" rel="noopener noreferrer">+56 9 4882 6938</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="mailto:mereytostaduria@gmail.com" target="_blank" rel="noopener noreferrer">mereytostaduria@gmail.com</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="https://goo.gl/maps/RjqWfruGcTu" target="_blank" rel="noopener noreferrer">Avenida Apoquindo 7482, Las Condes, Santiago</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item><span>SIGUENOS</span></ListGroup.Item>
              <ListGroup.Item>
              <a href="https://www.instagram.com/merey.tostaduria/" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="instagram logo"/>
              </a>
              <a href="https://www.facebook.com/merey.tostaduria" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="facebook logo"/>
              </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  </Footer>