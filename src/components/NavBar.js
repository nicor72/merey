import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends Component {
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
                <li className="nav-item active">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/Empresa" className="nav-link">Empresa</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
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