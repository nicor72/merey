import React from 'react'
import { Link } from "react-router-dom"
import ReactSVG from 'react-svg'
import { Row, Col } from 'react-bootstrap'

import Logo from './Logo'

import instagram from './../images/logo-de-instagram.svg'
import facebook from './../images/facebook-logo.svg'

export default () => {
  return (
    <div className="row bg-black">
      <div className="col-md nav-height">
        <Logo />
      </div>
      <nav className="col-md navbar navbar-expand-lg navbar-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mt-2 mt-lg-0">
            <li className="nav-item">
              <Link 
                id="/" 
                to="/" 
                className="navMenu-link"
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                id="/empresa" 
                to="/empresa" 
                className="navMenu-link"
              >
                Empresa
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                id="/productos"
                to="/productos"
                className="navMenu-link"
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                id="/estamos" 
                to="/estamos" 
                className="navMenu-link"
              >
                Donde estamos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                id="/contacto" 
                to="/contacto" 
                className="navMenu-link"
              >
                Contacto
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