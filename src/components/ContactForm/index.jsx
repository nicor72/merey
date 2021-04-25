import React from 'react'
import emailjs from 'emailjs-com'

const Form = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs.send('default_service', 'template_pHSrlqnp', formData, 'user_ooCeVcyqOeUeSCvH4M2Vk')
      .then((result) => {
        console.log(result.text)
      }, (error) => {
        console.log(error.text)
      });
  }

  var formStyle = {
    paddingBottom: 300 + 'px',
    paddingTop: 30 + 'px'
  }

  return (
      <div className="container" style={formStyle}>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <label htmlFor="name">Nombre</label>
              <input 
                id="name" 
                type="text" 
                name="name" 
                className="form-control" 
                placeholder="Ingresa un nombre"
                value={formData.name}
                onChange={({target: {value}}) => handleChange('name', value)} 
              />
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <label htmlFor="email">Correo electrónico</label>
              <input 
                id="email" 
                type="email" 
                name="email" 
                className="form-control" 
                placeholder="Ingresa un email"
                value={formData.email}
                onChange={({target: {value}}) => handleChange('email', value)} 
              />
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <label className="form-check-label" htmlFor="message">Mensaje</label>
              <textarea 
                id="message" 
                name="message" 
                className="form-control" 
                placeholder="Ingresa un mensaje"
                value={formData.message}
                onChange={({target: {value}}) => handleChange('message', value)} 
              />
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="form-group col-md-6">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>  
          </div>  
        </form>
      </div>  
  )
}

export default Form