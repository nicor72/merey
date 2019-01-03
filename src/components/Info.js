import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactDOM               from 'react-dom';
import IntersectionVisible    from 'react-intersection-visible';
import posed from "react-pose";

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
      <div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <h1 className="info-title">
              DATE UN GUSTO
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <IntersectionVisible onShow={ e => this.onShow( e )} >
                <LeftInfo pose={this.state.show ? 'right' : 'left'}>
                  <span style={{fontSize: 3 + 'em'}}>
                    <i className="fas fa-brain col-md-12" style={{textAlign: 'center'}}></i>
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
                  <i className="fas fa-grin-hearts col-md-12" style={{textAlign: 'center'}}></i>
                </span>
                <div className="info-text">
                    Desde 1920 ofreciendo los mejores y más sabrosos frutos secos como nueces, almendras, avellanas, maníes y huesillos entre otros.
                </div>
              </CenterInfo>
            </div>
            <div className="col-md-4">
              <RightInfo pose={this.state.show ? 'left' : 'right'}>
                <span style={{fontSize: 3 + 'em'}}>
                  <i className="fas fa-heart col-md-12" style={{textAlign: 'center'}}></i>
                </span>
                <div className="info-text">
                    Desde 1920 ofreciendo los mejores y más sabrosos frutos secos como nueces, almendras, avellanas, maníes y huesillos entre otros.
                </div>
              </RightInfo>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Info;