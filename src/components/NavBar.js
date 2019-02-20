import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import ReactSVG from 'react-svg'

import Logo from './Logo';

import instagram from './../images/logo-de-instagram.svg';
import facebook from './../images/facebook-logo.svg';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.location.pathname
    }
    this.click= this.click.bind(this);
  }

  click(event) {
    let id = event.currentTarget.id;
    this.setState({isActive: id})
  }

  render() {
    return (
      <div>
        <div className="row bg-black">
          <div className="offset-md-1 col-md-2 nav-height">
            <Logo />
          </div>
          <nav className="col-md-6 navbar navbar-expand-lg navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link 
                    id="/" 
                    to="/" 
                    className={`navMenu-link ${this.state.isActive === '/' ? 'active-link' : ''}`} 
                    onClick={this.click}
                  >
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    id="/empresa" 
                    to="/empresa" 
                    className={`navMenu-link ${this.state.isActive === '/empresa' ? 'active-link' : ''}`} 
                    onClick={this.click}
                  >
                    Empresa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    id="/productos"
                    to="/productos"
                    className={`navMenu-link ${this.state.isActive === '/productos' ? 'active-link' : ''}`}
                    onClick={this.click}
                  >
                    Productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    id="/estamos" 
                    to="/estamos" 
                    className={`navMenu-link ${this.state.isActive === '/estamos' ? 'active-link' : ''}`}
                    onClick={this.click}
                  >
                    Donde estamos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    id="/contacto" 
                    to="/contacto" 
                    className={`navMenu-link ${this.state.isActive === '/contacto' ? 'active-link' : ''}`}  
                    onClick={this.click}
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <a
              href="https://www.instagram.com/merey.tostaduria/"
              target="_blank" 
            >
              <ReactSVG src={instagram} />
            </a>
            <a 
              href="https://www.facebook.com/merey.tostaduria"
              target="_blank"
            >
              <ReactSVG src={facebook} />
            </a>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);