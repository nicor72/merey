import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import { RiShoppingCartFill, RiChatSmile3Fill, RiRoadMapFill, RiHomeHeartLine, RiStore2Line } from 'react-icons/ri'
import SideNav, { MenuIcon } from 'react-simple-sidenav'
import Logo from './Logo'
import Searcher from './Searcher'
import ShoppingCart from '../ShoopingCart'
import Wrapper from './Style'

export default () => {
  const [modalShow, setModalShow] = React.useState(false)
  const [showNav, setShowNav] = useState()
  const { cart } = useSelector((state) => state)

  const navItems = [
    <Searcher setShowNav={setShowNav}/>,
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
  ];

  return (
    <Wrapper>
      <Navbar variant="dark" expand="lg" fixed="top">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/empresa" className="nav-link">Empresa</Link>
            <Link to="/productos" className="nav-link">Productos</Link>
            <Link to="/estamos" className="nav-link">Estamos</Link>
            <Link to="/contacto" className="nav-link">Contacto</Link>
          </Nav>
          <Searcher setShowNav={setShowNav}/>
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
    </Wrapper>
  )
}