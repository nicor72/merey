import React, { Component } from 'react';

class Estamos extends Component {
  render() {
    return (
      <div>
      	<div className="container">
	        <h1 className="sub-main-title">
	            VISITANOS EN:
	        </h1>
	        <div className="container-fluid" style={{paddingTop: 30 + 'px'}}>
	            <div className="map">
	                <iframe
	                	title="our-location"
	                	src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.5791940133868!2d-70.55420958480184!3d-33.408141080786116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf7bebe0d663%3A0x4793c72a0c983e43!2sMerey+Tostaduria!5e0!3m2!1ses!2scl!4v1546188723539" 
	                	width="100%" 
	                	height="450" 
	                	frameBorder="0" 
	                	style={{border:0}}
	                	allowFullScreen>
	                </iframe>
	            </div>
	        </div>
	        <div className="container">
	        	<div className="row justify-content-md-center">
	                <div className="col-sm-6">
	                    <div className="location-div">
	                        <div className="location-title">Horario de atención</div>
	                        <div className="location-text">
	                            <span style={{fontWeight:600}}>Lunes a viernes:</span><br />
	                             de 9:00 a 21:00 hrs.<br /><br />
	                        </div>
	                        <div className="location-text">
	                            <span style={{fontWeight:600}}>Sábados y Domingos:</span><br />
	                             de 10:00 a 19:00 hrs.<br /><br /> 
	                        </div>                        
	                    </div>    
	                </div>
	                <div className="col-sm-6">
	                    <div className="location-div">
	                        <div className="location-title">Estacionamientos cercanos</div>
	                        <div className="location-text">
	                            <span style={{fontWeight:600}}>Super Mercado Santa Isabel:</span><br />
	                            Av. Apoquindo Nº 7200, Las Condes. <br /><br />
	                        </div>    
	                        <div className="location-text">
	                       		<span style={{fontWeight:600}}>Copec:</span><br />
	                            Av. Apoquindo Nº 7520, Las Condes. <br /><br />
	                        </div>
	                    </div>   
	                </div> 
	            </div> 
            </div>
	    </div>    
      </div>
    );
  }
}

export default Estamos;