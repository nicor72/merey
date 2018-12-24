import React, { Component } from 'react';
import { Link } from "react-router-dom";


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: 'home'
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
        <div className="row justify-content-md-center">
          <nav className="col-md-auto navbar navbar-expand-lg navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className={`nav-item ${this.state.isActive === 'home' ? 'active' : ''}`}>
                  <Link id="home" to="/" className="nav-link" onClick={this.click}>Home</Link>
                </li>
                <li className={`nav-item ${this.state.isActive === 'empresa' ? 'active' : ''}`}>
                  <Link id="empresa" to="/Empresa" className="nav-link" onClick={this.click}>Empresa</Link>
                </li>
                <li className={`nav-item ${this.state.isActive === 'productos' ? 'active' : ''}`}>
                  <Link id="productos" to="/productos" className="nav-link" onClick={this.click}>Productos</Link>
                </li>
                <li className={`nav-item ${this.state.isActive === 'estamos' ? 'active' : ''}`}>
                  <Link id="estamos" to="/estamos" className="nav-link" onClick={this.click}>Donde estamos</Link>
                </li>
                <li className={`nav-item ${this.state.isActive === 'contacto' ? 'active' : ''}`}>
                  <Link id="contacto" to="/contacto" className="nav-link" onClick={this.click}>Contacto</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;