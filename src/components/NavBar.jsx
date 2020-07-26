import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import ReactSVG from 'react-svg'

import Logo from './Logo'

import instagram from './../images/logo-de-instagram.svg'
import facebook from './../images/facebook-logo.svg'

export default () => {
  const { cart } = useSelector((state) => state)
  return (
    <div className="row bg-black">
      <div className="col-md nav-height">
        <Logo />
      </div>
      <nav className="col-md navbar navbar-expand-lg navbar-light">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarTogglerDemo03" 
          aria-controls="navbarTogglerDemo03" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mt-2 mt-lg-0">
            <li className="nav-item">
              <Link
                to="/" 
                className="navMenu-link"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/empresa" 
                className="navMenu-link"
              >
                Empresa
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/productos"
                className="navMenu-link"
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/estamos" 
                className="navMenu-link"
              >
                Donde estamos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contacto" 
                className="navMenu-link"
              >
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/carrito" 
                className="navMenu-link"
              >
                Carrito 
                {
                  cart.length > 0 &&
                  <Badge variant="light">{cart.length}</Badge>
                }
              </Link>
            </li>
          </ul>
          <a
            href="https://www.instagram.com/merey.tostaduria/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ReactSVG src={instagram} />
          </a>
          <a 
            href="https://www.facebook.com/merey.tostaduria"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ReactSVG src={facebook} />
          </a>
        </div>
      </nav>
    </div>
  )
}