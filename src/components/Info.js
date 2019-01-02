import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactDOM               from 'react-dom';
import IntersectionVisible    from 'react-intersection-visible';
import posed from "react-pose";

import ardilla from './../images/ardilla.jpg';

const LeftInfo = posed.div({
  left: { x: -100, opacity: 0 },
  right: { x: 0, opacity: 1, delay: 1000 }
});

const CenterInfo = posed.div({
  hidden: {opacity: 0 },
  show: {opacity: 1, delay: 1000 },
});

const RightInfo = posed.div({
  right: { x: 100, opacity: 0 },
  left: { x: 0, opacity: 1, delay: 1000 }
});

class Info extends Component {

  onShow() {
    this.setState({ show: true });
  }

  state = { show: false };

  render() {
    return (
      <div style={{marginTop: 20 + 'vh'}}>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <h1 className="info-title">
              MEREY TOSTADURÍA
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row" style={{height: 70 + 'vh'}}>
            <div className="col-md-4">
              <IntersectionVisible onShow={ e => this.onShow( e )} >
                <LeftInfo pose={this.state.show ? 'right' : 'left'}>
                  <span style={{fontSize: 3 + 'em'}}>
                    <i className="fas fa-blender col-md-12" style={{textAlign: 'center'}}></i>
                  </span>
                  <div className="info-text">
                      Desde 1920 ofreciendo los mejores y más sabrosos frutos secos como nueces, almendras, avellanas, maníes y huesillos entre otros.
                  </div>
                </LeftInfo>
              </IntersectionVisible>  
            </div>
            <div className="col-md-4">
              <CenterInfo pose={this.state.show ? 'show' : 'hidden'}>
                <span style={{fontSize: 3 + 'em'}}>
                  <i className="fas fa-blender col-md-12" style={{textAlign: 'center'}}></i>
                </span>
                <div className="info-text">
                    Desde 1920 ofreciendo los mejores y más sabrosos frutos secos como nueces, almendras, avellanas, maníes y huesillos entre otros.
                </div>
              </CenterInfo>
            </div>
            <div className="col-md-4">
              <RightInfo pose={this.state.show ? 'left' : 'right'}>
                <span style={{fontSize: 3 + 'em'}}>
                  <i className="fas fa-blender col-md-12" style={{textAlign: 'center'}}></i>
                </span>
                <div className="info-text">
                    Desde 1920 ofreciendo los mejores y más sabrosos frutos secos como nueces, almendras, avellanas, maníes y huesillos entre otros.
                </div>
              </RightInfo>
            </div>
          </div>
        </div>

        <div className="jumbotron" style={{width: "100%", height: "500px", backgroundImage: "url(" + ardilla + ")", backgroundSize: 'cover'}}>
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4" />
          <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <div className="info-text2">
                Realizamos ventas al por mayor a comercios, instituciones restaurantes, comunidades y particulares en todo Chile.<br/><br/>
                Haga su pedido a través de nuestro formulario.
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <Link id="contacto" to="/contacto" className="nav-link" onClick={this.click}>
              <button type="button" className="btn btn-outline-secondary btn-lg medium-margin-bottom">Contacto</button>
            </Link>
            <button type="button" className="btn btn-outline-secondary btn-lg medium-margin-bottom">Contacto</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;