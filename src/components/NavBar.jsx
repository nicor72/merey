import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import styled from 'styled-components'

import Logo from './Logo'

const NavStyle = styled.div`
  nav {
    background-color: black !important;
    padding: 0 1rem;
  }
  .badge {
    margin-left: .5rem;
  }
`

export default () => {
  const ref = useRef(null)
  const { cart } = useSelector((state) => state)

  window.onscroll = () => {
    const sticky = ref.current.offsetTop;
    if (window.pageYOffset > sticky) {
      ref.current.classList.add('fixed-top')
    } else {
      ref.current.classList.remove('fixed-top')
    }
  }

  return (
    <NavStyle>
      <Navbar ref={ref} bg="dark" variant="dark" expand="lg">
        <Link to="/" className="navbar-brand">
          <Logo/>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/empresa" className="nav-link">Empresa</Link>
            <Link to="/productos" className="nav-link">Productos</Link>
            <Link to="/estamos" className="nav-link">Estamos</Link>
            <Link to="/contacto" className="nav-link">Contacto</Link>
            <Link to="/carrito" className="nav-link">
              Carrito
              {
                cart.length > 0 &&
                <Badge variant="light">{cart.length}</Badge>
              }
            </Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="¿Qué estas buscando?" className="mr-sm-2" />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </NavStyle>
  )
}