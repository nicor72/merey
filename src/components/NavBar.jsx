import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import { RiShoppingCartFill, RiChatSmile3Fill, RiRoadMapFill, RiHomeHeartLine, RiStore2Line } from 'react-icons/ri'
import SideNav, { MenuIcon } from 'react-simple-sidenav'
import styled from 'styled-components'
import Logo from './Logo'
import Search from './Search'
import ShoppingCart from '../views/ShoppingCart'

const NavStyle = styled.div`
  background-color: black !important;

  .navbar {
    background-color: black !important;
  }

  ul {
    list-style-type: none;
  }

  li {
    padding: 0 !important;
    a {
      color: black;
    }
  }

  button {
    background-color: transparent;
    border: none;
    outline:none;
    color: white;
    &:hover {
      border: none;
    }
    svg {
      display: initial;
    }
  }
  .clearfix {
    width: 100%;
    height: 10rem;
  }
  
  .badge {
    margin-left: .5rem;
  }

  @media (min-width: 992px) {
    svg {
      display: none;
    }
  }
`

export default () => {
  const ref = useRef(null)
  const [showNav, setShowNav] = useState()
  const { cart } = useSelector((state) => state)

  // window.onscroll = () => {
  //   const sticky = ref.current.offsetTop;
  //   if (window.pageYOffset > sticky) {
  //     ref.current.classList.add('fixed-top')
  //   } else {
  //     ref.current.classList.remove('fixed-top')
  //   }
  // }

  const navItems = [
    <Search setShowNav={setShowNav}/>,
    <Link to="/empresa" className="nav-link" onClick={() => setShowNav(false)}>
      <RiHomeHeartLine size={32} className="pr-2" />
      Empresa
    </Link>,
    <Link to="/productos" className="nav-link" onClick={() => setShowNav(false)}>
      <RiStore2Line size={32} className="pr-2" />
      Productos
    </Link>,
    <Link to="/estamos" className="nav-link" onClick={() => setShowNav(false)}>
      <RiRoadMapFill size={32} className="pr-2" />
      Estamos
    </Link>,
    <Link to="/contacto" className="nav-link" onClick={() => setShowNav(false)}>
      <RiChatSmile3Fill size={32} className="pr-2"/>
      Contacto
    </Link>
    // <Link to="/carrito" className="nav-link" onClick={() => setShowNav(false)}>
    //   Carrito
    //   {
    //     cart.length > 0 &&
    //     <Badge variant="light">{cart.length}</Badge>
    //   }
    // </Link>
  ];

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <NavStyle>
      <Navbar ref={ref} variant="dark" expand="lg" fixed="top">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/empresa" className="nav-link">Empresa</Link>
            <Link to="/productos" className="nav-link">Productos</Link>
            <Link to="/estamos" className="nav-link">Estamos</Link>
            <Link to="/contacto" className="nav-link">Contacto</Link>
            {/* <button onClick={() => setModalShow(true)} className="nav-link">
              Carrito
              {
                cart.length > 0 &&
                <Badge variant="light">{cart.length}</Badge>
              }
            </button> */}
            
          </Nav>
          <Search setShowNav={setShowNav}/>
        </Navbar.Collapse>
        <button onClick={() => setModalShow(true)} className="nav-link">
          <RiShoppingCartFill size={32}/>
              {
            cart.length > 0 &&
            <Badge variant="light">{cart.length}</Badge>
          }
        </button>

        <MenuIcon onClick={() => setShowNav(true)}/>
        <SideNav 
          openFromRight={true}
          showNav={showNav} 
          onHideNav={() => setShowNav(false)}
          title={<Logo />}
          titleStyle={{ backgroundColor: '#000' }}
          items={navItems}
        />
      </Navbar>

      <div className="clearfix"></div>
      <ShoppingCart modalShow={modalShow} setModalShow={setModalShow} />
      {/* <Navbar ref={ref} bg="dark" variant="dark" expand="lg">
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
          <Search />
        </Navbar.Collapse>
      </Navbar> */}
    </NavStyle>
  )
}