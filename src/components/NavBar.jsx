import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import ReactSVG from 'react-svg'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import styled from 'styled-components'

import Logo from './Logo'
import instagram from './../images/logo-de-instagram.svg'
import facebook from './../images/facebook-logo.svg'

const NavStyle = styled.div`
  nav {
    background-color: black !important;
  }
  .badge {
    margin-left: 0.5em;
  }
`

export default () => {
  const { cart } = useSelector((state) => state)
  return (
    <NavStyle>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <Logo/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/empresa">Empresa</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/estamos">Estamos</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <Nav.Link href="/carrito">
              Carrito
              {
                cart.length > 0 &&
                <Badge variant="light">{cart.length}</Badge>
              }
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </NavStyle>
    // <div className="row bg-black">
    //   <div className="col-md nav-height">
    //     <Logo />
    //   </div>
    //   <nav className="col-md navbar navbar-expand-lg navbar-light">
    //     <button 
    //       className="navbar-toggler" 
    //       type="button" 
    //       data-toggle="collapse" 
    //       data-target="#navbarTogglerDemo03" 
    //       aria-controls="navbarTogglerDemo03" 
    //       aria-expanded="false" 
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
    //       <ul className="navbar-nav mt-2 mt-lg-0">
    //         <li className="nav-item">
    //           <Link
    //             to="/" 
    //             className="navMenu-link"
    //           >
    //             Inicio
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link
    //             to="/empresa" 
    //             className="navMenu-link"
    //           >
    //             Empresa
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link
    //             to="/productos"
    //             className="navMenu-link"
    //           >
    //             Productos
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link
    //             to="/estamos" 
    //             className="navMenu-link"
    //           >
    //             Donde estamos
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link
    //             to="/contacto" 
    //             className="navMenu-link"
    //           >
    //             Contacto
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link
    //             to="/carrito" 
    //             className="navMenu-link"
    //           >
    //             Carrito 
    //             {
    //               cart.length > 0 &&
    //               <Badge variant="light">{cart.length}</Badge>
    //             }
    //           </Link>
    //         </li>
    //       </ul>
    //       <a
    //         href="https://www.instagram.com/merey.tostaduria/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <ReactSVG src={instagram} />
    //       </a>
    //       <a 
    //         href="https://www.facebook.com/merey.tostaduria"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <ReactSVG src={facebook} />
    //       </a>
    //     </div>
    //   </nav>
    // </div>
  )
}