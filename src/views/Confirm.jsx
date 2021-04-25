import React from 'react'
import emailjs from 'emailjs-com'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import { useSelector } from 'react-redux'
import { Formik} from 'formik'
import { Col, Form, Button, Spinner, Alert } from 'react-bootstrap'

export default () => {
  const { cart } = useSelector((state) => state)
  const [email, setEmail] = React.useState({
    sending: false,
    sent: false,
    error: false
  })

  const productId = cart.reduce((acc, product) =>
    acc = [...acc, product.codigo]
    , [])

  const queryProducts = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (queryProducts.data) {
    cart.map((product) => {
      const {
        precio_web,
        nombre,
        cantidad_disponible,
        formato_web,
        variante_web,
        fotos
      } = queryProducts.data.productos.find(({ codigo }) => codigo === product.codigo)

      product.precio_web = precio_web
      product.nombre = nombre
      product.cantidad_disponible = cantidad_disponible
      product.formato_web = formato_web
      product.variante_web = variante_web
      product.fotos = fotos

      return true
    })
  }

  const shippingCosts = {
    'VITACURA': 3600,
    'LAS CONDES': 3600,
    'LA REINA': 3600,
    'PROVIDENCIA': 3600,
    'NUÑOA': 3600,
    'SANTIAGO CENTRO': 3600,
    'LO BARNECHEA': 4200,
    'PEÑALOLÉN': 4200,
    'INDEPENDENCIA': 4200,
    'RECOLETA': 4200,
    'HUECHURABA': 4200,
    'CERRO NAVIA': 4800,
    'LO PRADO': 4800,
    'QUINTA NORMAL': 4800,
    'RENCA': 4800,
    'CONCHALI': 4800,
    'LA CISTERNA': 4800,
    'LA GRANJA': 4800,
    'LO ESPEJO': 4800,
    'PEDRO AGUIRRE CERDA': 4800,
    'SAN JOAQUIN': 4800,
    'SAN MIGUEL': 4800,
    'SAN RAMÓN': 4800,
    'MACUL': 4800,
    'CERRILLOS': 4800,
    'ESTACIÓN CENTRAL': 4800,
    'LA FLORIDA': 5400,
    'PUENTE ALTO': 5400,
    'PUDAHUEL': 5400,
    'QUILICURA': 5400,
    'SAN BERNARDO': 5400,
    'MAIPU': 5400
  }

  var formStyle = {
    paddingBottom: 300 + 'px',
    paddingTop: 30 + 'px'
  }

  return (
    <div className="container medium-margin-top">
      <h1 className="sub-main-title">
        CONFIRMACIÓN DE COTIZACIÓN
      </h1>
      <div className="container" style={formStyle}>
        {email.sent ?
          email.error ?
            <Alert variant="danger">
              Ocurrió un error, inténtalo mas tarde
            </Alert> :
            <Alert variant="success">
              Tu solicitud se envió exitosamente. Recibirás un correo con la confirmación.<br></br>
              Si tienes alguna duda puedes comunicarte con nosotros al <a href="tel:+56948826938" target="_blank" rel="noopener noreferrer">+56 9 4882 6938</a>
            </Alert> 
          : <Formik
            initialValues={{
              name: '',
              email: '',
              street: '',
              number: 0,
              dept: '',
              phone: 0,
              commune: ''
            }}
            validate={values => {
              const errors = {}
              if (!values.name) {
                errors.name = 'Este campo es requerido';
              }
              if (!values.phone) {
                errors.phone = 'Este campo es requerido';
              }
              if (!values.street) {
                errors.street = 'Este campo es requerido';
              }
              if (!values.number) {
                errors.number = 'Este campo es requerido';
              }
              if (!values.commune) {
                errors.commune = 'Este campo es requerido';
              }
              if (!values.email) {
                errors.email = 'Este campo es requerido';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Formato incorrecto del email'
              }
              return errors
            }}
            onSubmit={(values) => {
              values.products = '<table><thead><tr><th>Cantidad</th><th>Producto</th><th>Código</th><th>Formato</th><th>Variante</th><th>Precio</th></tr></thead><tbody>'
              values.products+= cart.map((product) => {
                return `<tr><td>${product.cantidad}</td><td>${product.nombre}</td><td>${product.codigo}</td><td>${product.formato_web}</td><td>${product.variante_web}</td><td>${product.precio_web}</td></tr>`
              })
              values.products += `<tr></tr><tr><td></td><td></td><td></td><td>Costo de envío</td><td>${values.commune}</td><td>${shippingCosts[values.commune]}</td></tr>`
              values.products += `<tr><td></td><td></td><td></td><td></td><td>TOTAL</td><td>${(cart.reduce((acc, { cantidad, precio_web }) => acc = acc + (cantidad * precio_web), 0)) + shippingCosts[values.commune]}</td></tr>`
              values.products+= '</tbody></table>'

              setEmail({ sending: true, sent: false, error: false })

              emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE, process.env.REACT_APP_EMAILJS_TEMPLATE, values, process.env.REACT_APP_EMAILJS_USERID)
                .then((result) => {
                  setEmail({ sending: false, sent: true, error: false })
                  console.log(result.text)
                }, (error) => {
                  setEmail({ sending: false, sent: false, error: true })
                  console.log(error.text)
                })
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  id="name"
                  type="text" 
                  placeholder="Ingresa tu nombre completo" 
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Ingresa tu email para contactarte"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  id="phone"
                  type="number"
                  placeholder="Ingresa tu teléfono para contactarte"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.phone && !errors.phone}
                  isInvalid={touched.phone && errors.phone}
                />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Calle/Avenida</Form.Label>
                <Form.Control
                  id="street"
                  type="text"
                  placeholder="Ingresa una calle o avenida"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.street && !errors.street}
                  isInvalid={touched.street && errors.street}
                />
                  <Form.Control.Feedback type="invalid">
                    {errors.street}
                  </Form.Control.Feedback>
              </Form.Group>
                <Form.Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Group>
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        id="number"
                        type="number"
                        placeholder="Ingresa un número de calle"
                        value={values.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.number && !errors.number}
                        isInvalid={touched.number && errors.number}
                      />
                        <Form.Control.Feedback type="invalid">
                          {errors.number}
                        </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs="auto">
                    <Form.Group>
                      <Form.Label>Depto</Form.Label>
                      <Form.Control
                        id="dept"
                        type="text"
                        placeholder="Opcional"
                        value={values.dept}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>
              <Form.Group style={{position: 'relative'}}>
                <Form.Label>Comuna</Form.Label>
                <Form.Control 
                  id="commune"
                  as="select"
                  name="commune"
                  placeholder="Ingresa una comuna"
                  value={values.commune}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.commune && !errors.commune}
                  isInvalid={touched.commune && errors.commune}
                >
                  <option>Selecciona una comuna</option>
                  <option value="VITACURA">VITACURA</option>
                  <option value="LAS CONDES">LAS CONDES</option>
                  <option value="LA REINA">LA REINA</option>
                  <option value="PROVIDENCIA">PROVIDENCIA</option>
                  <option value="NUÑOA">NUÑOA</option>
                  <option value="SANTIAGO CENTRO">SANTIAGO CENTRO</option>
                  <option value="LO BARNECHEA">LO BARNECHEA</option>
                  <option value="PEÑALOLÉN">PEÑALOLÉN</option>
                  <option value="INDEPENDENCIA">INDEPENDENCIA</option>
                  <option value="RECOLETA">RECOLETA</option>
                  <option value="HUECHURABA">HUECHURABA</option>
                  <option value="CERRO NAVIA">CERRO NAVIA</option>
                  <option value="LO PRADO">LO PRADO</option>
                  <option value="QUINTA NORMAL">QUINTA NORMAL</option>
                  <option value="RENCA">RENCA</option>
                  <option value="CONCHALI">CONCHALI</option>
                  <option value="LA CISTERNA">LA CISTERNA</option>
                  <option value="LA GRANJA">LA GRANJA</option>
                  <option value="LO ESPEJO">LO ESPEJO</option>
                  <option value="PEDRO AGUIRRE CERDA">PEDRO AGUIRRE CERDA</option>
                  <option value="SAN JOAQUIN">SAN JOAQUIN</option>
                  <option value="SAN MIGUEL">SAN MIGUEL</option>
                  <option value="SAN RAMÓN">SAN RAMÓN</option>
                  <option value="MACUL">MACUL</option>
                  <option value="CERRILLOS">CERRILLOS</option>
                  <option value="ESTACIÓN CENTRAL">ESTACIÓN CENTRAL (No incluye Meiggs)</option>
                  <option value="LA FLORIDA">LA FLORIDA</option>
                  <option value="PUENTE ALTO">PUENTE ALTO</option>
                  <option value="PUDAHUEL">PUDAHUEL</option>
                  <option value="QUILICURA">QUILICURA</option>
                  <option value="SAN BERNARDO">SAN BERNARDO</option>
                  <option value="MAIPU">MAIPU</option>
                </Form.Control>
                  <Form.Text 
                    style={{
                      padding: '.25rem .5rem',
                      marginTop: '4px',
                      fontSize: '15px',
                      lineHeight: '1.5',
                      color: '#fff',
                      backgroundColor: 'rgba(40,167,69,.9)',
                      borderRadius: '.25rem'
                    }}
                  >
                    {values.commune ? 
                      `Costo de envío estimado para ${values.commune}: $${shippingCosts[values.commune]}` :
                      'Selecciona una comuna para saber el costo de envío'
                    }
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.commune}
                  </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={email.sending}>
                {email.sending ?
                  <Spinner animation="border" variant="light" /> :
                  'Enviar Cotización'
                }
              </Button>
            </Form>
            // <div className="row justify-content-md-center">
            //   <div className="form-group col-md-6">
            //     <label htmlFor="name">Nombre</label>
            //     <input 
            //       type="text" 
            //       name="name" 
            //       className="form-control" 
            //       placeholder="Ingresa un nombre"
            //     />
            //   </div>
            // </div> 
            )}
          </Formik>
      }
      </div>  
    </div>
  )
}