import React, { Component } from 'react';

import Form from './components/Form'

class Contacto extends Component {
  render() {
    return (
      <div>
      	<div className="container medium-margin-top">
	        <h1 className="sub-main-title">
	            CONTACTO
	        </h1>
	        <Form />
	    </div>    
      </div>
    );
  }
}

export default Contacto;