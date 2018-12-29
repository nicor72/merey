import React, { Component } from 'react';
import Logo from './components/Logo';

class Empresa extends Component {
  render() {
    return (
      <div>
      	<div className="container">
	        <h1 className="tit-interior_black">
	            NUESTRA EMPRESA
	        </h1>
	        <div className="container-fluid bg_quienes">
	            <div className="container">
	                <div className="txt_interior">Somos una empresa con más de noventa años en el mercado, envasadora y distribuidora de frutos secos, alimentos naturales, harinas especiales, condimentos, repostería, yerba mate, importación y elaboración de café en grano, tostado de maní, avellanas, trigo, alimentos para vegetarianos, etc.<br /><br />
	                	Nuestro principal énfasis y esfuerzo es garantizar la calidad de los productos que vendemos.<br /><br />
	                	Esto nos ha permitido permanecer con una clientela estable por mucho tiempo, que nos premia con su confianza y preferencia.
	                </div>
	            </div>
	        </div>
	    </div>    
      </div>
    );
  }
}

export default Empresa;
