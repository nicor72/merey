import React, { Component } from 'react';
import secos from './../images/secos.png';

class Info extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-md-center bg-cream">
          <div className="col-md-auto">
            <h1 className="info-title">
                TOSTADURÍA PUERTO RICO
            </h1>
          </div>
        </div>
        <div className="row justify-content-md-center bg-cream">
          <div className="col-md-auto">
            <div className="info-text">
                Desde 1920 ofreciendo los mejores y más sabrosos frutos secos como nueces, almendras, avellanas, maníes y huesillos entre otros.
            </div>
            <img src={secos} alt="" className="center-block" /> 
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
            <button type="button" className="btn btn-outline-secondary btn-lg medium-margin-bottom">Contacto</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;