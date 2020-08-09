import React, { Component } from 'react';

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "" };
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => alert("Mensaje enviado correctamente!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    var formStyle = {
      paddingBottom: 300 + 'px',
      paddingTop: 30 + 'px'
    }

    const { name, email, message } = this.state;

    return (
      <div className="container" style={formStyle}>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <label htmlFor="name">Nombre</label>
              <input id="name" className="form-control" type="text" name="name" value={name} onChange={this.handleChange} placeholder="Ingresa un nombre"/>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <label htmlFor="email">Password</label>
              <input id="email" className="form-control" type="email" name="email" value={email} onChange={this.handleChange} placeholder="Ingresa un email"/>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <label className="form-check-label" htmlFor="message">Mensaje</label>
              <textarea id="message" className="form-control" name="message" value={message} onChange={this.handleChange} placeholder="Ingresa un mensaje"/>
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>  
          </div>  
        </form>
      </div>  
    );
  }
}

export default Form;