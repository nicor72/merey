import React from 'react'
import ReactDOMServer from 'react-dom/server';
import emailjs from 'emailjs-com'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import { useSelector, useDispatch } from 'react-redux'
import { Formik} from 'formik'
import { Col, Form, Button, Spinner, Alert, Table } from 'react-bootstrap'

export default () => {
  const dispatch = useDispatch()
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

  console.log(cart)

  const shippingCosts = {
    'LA REINA': 2700,
    'LAS CONDES': 2700,
    'LO BARNECHEA': 2700,
    'PEÑALOLÉN': 2700,
    'VITACURA': 2700,
    'MACUL': 3100,
    'ÑUÑOA': 3100,
    'PROVIDENCIA': 3100,
    'SAN JOAQUÍN': 3100,
    'SAN MIGUEL': 3100,
    'SANTIAGO CENTRO': 3100,
    'CARRILLOS': 3700,
    'CERRO NAVIA': 3700,
    'ESTACIÓN CENTRAL': 3700,
    'LO ESPEJO': 3700,
    'LO PRADO': 3700,
    'MAIPÚ': 3700,
    'PEDRO AGUIERRE CERDA': 3700,
    'PUDAHUEL': 3700,
    'QUINTA NORMAL': 3700,
    'SECTOR NORTE ': 3800,
    'CONCHALÍ': 3800,
    'HUECHURABA': 3800,
    'INDEPENDENCIA': 3800,
    'QUILICURA': 3800,
    'RECOLETA': 3800,
    'RENCA': 3800,
    'EL BOSQUE': 3900,
    'LA CISTERNA': 3900,
    'LA FLORIDA': 3900,
    'LA GRANJA': 3900,
    'LA PINTANA': 3900,
    'PUENTE ALTO': 3900,
    'SAN BERNARDO': 3900,
    'SAN RAMÓN': 3900,
    'BUIN': 4200,
    'CALERA DEL TANGO': 4200,
    'PAINE': 4200,
    'COLINA': 4200,
    'CHICUREO': 4200,
    'LAMPA': 4200,
    'PADRE HURTADO': 4200,
    'TALAGANTE': 4200,
    'PEÑAFLOR': 4200,
    'PIRQUE': 4200,
    'SAN JOSE DEL MAIPO': 4200
  }

  const formStyle = {
    paddingBottom: 300 + 'px',
    paddingTop: 30 + 'px'
  }

  const renderProductsTable = (values) => {
    const tableStyle = {
      main: {
        width: '100%',
        marginBottom: '1rem',
        color: '#212529',
        border: '1px solid #dee2e6',
        borderCollapse: 'collapse'
      },
      header: {
        borderBottomWidth: '2px',
        verticalAlign: 'bottom',
        borderBottom: '2px solid #dee2e6',
        border: '1px solid #dee2e6',
        padding: '.75rem',
      },
      description: {
        border: '1px solid #dee2e6',
        padding: '.75rem',
        verticalAlign: 'top',
      },
      list: {
        listStyle: 'none',
        textAlign: 'right'
      }
    }
    return (
      <React.Fragment>
        <table style={tableStyle.main}>
          <thead>
            <tr>
              <th style={tableStyle.header}>Cantidad</th>
              <th style={tableStyle.header}>Producto</th>
              <th style={tableStyle.header}>Código</th>
              <th style={tableStyle.header}>Formato</th>
              <th style={tableStyle.header}>Variante</th>
              <th style={tableStyle.header}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, key) =>
              <tr key={key} style={key % 2 === 0 ? { backgroundColor: 'rgba(0,0,0,.05)' }: {}}>
                <td style={tableStyle.description}>{product.cantidad}</td>
                <td style={tableStyle.description}>{product.nombre}</td>
                <td style={tableStyle.description}>{product.codigo}</td>
                <td style={tableStyle.description}>{product.formato_web}</td>
                <td style={tableStyle.description}>{product.variante_web}</td>
                <td style={tableStyle.description}>$ {product.precio_web}</td>
              </tr>
            )}
          </tbody>
        </table>
        <ul style={tableStyle.list}>
          <li>Productos: $ {cart.reduce((acc, { cantidad, precio_web }) => acc = acc + (cantidad * precio_web), 0)}</li>
          <li>Envio {values.express ? 'Express por Calcular' : `${values.commune}: $ ${shippingCosts[values.commune]}`}</li>
          <li>Descuentos: ------</li>
          <li style={{ fontWeight: 'bolder'}}>Total: $ {(cart.reduce((acc, { cantidad, precio_web }) => acc = acc + (cantidad * precio_web), 0)) + shippingCosts[values.commune]}</li>
        </ul>
      </React.Fragment>
    )
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
              commune: '',
              express: false,
              notes: ''
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
              // values.products = '<table><thead><tr><th>Cantidad</th><th>Producto</th><th>Código</th><th>Formato</th><th>Variante</th><th>Precio</th></tr></thead><tbody>'
              // values.products+= cart.map((product) => {
              //   return `<tr><td>${product.cantidad}</td><td>${product.nombre}</td><td>${product.codigo}</td><td>${product.formato_web}</td><td>${product.variante_web}</td><td>${product.precio_web}</td></tr>`
              // })
              // values.products += `<tr></tr><tr><td></td><td></td><td></td><td>Costo de envío</td><td>${values.commune}</td><td>${shippingCosts[values.commune]}</td></tr>`
              // values.products += `<tr><td></td><td></td><td></td><td></td><td>TOTAL</td><td>${(cart.reduce((acc, { cantidad, precio_web }) => acc = acc + (cantidad * precio_web), 0)) + shippingCosts[values.commune]}</td></tr>`
              // values.products+= '</tbody></table>'

              values.products = ReactDOMServer.renderToString(renderProductsTable(values))

              setEmail({ sending: true, sent: false, error: false })

              console.log(values)

              emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE, process.env.REACT_APP_EMAILJS_TEMPLATE, values, process.env.REACT_APP_EMAILJS_USERID)
                .then((result) => {
                  setEmail({ sending: false, sent: true, error: false })
                  dispatch({ type: 'CLEAN_CART' })
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
                        isValid={touched.notes && !errors.notes}
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
                  <option value="">Selecciona una comuna</option>
                  <option value="LA REINA">LA REINA</option>
                  <option value="LAS CONDES">LAS CONDES</option>
                  <option value="LO BARNECHEA">LO BARNECHEA</option>
                  <option value="PEÑALOLÉN">PEÑALOLÉN</option>
                  <option value="VITACURA">VITACURA</option>
                  <option value="MACUL">MACUL</option>
                  <option value="ÑUÑOA">ÑUÑOA</option>
                  <option value="PROVIDENCIA">PROVIDENCIA</option>
                  <option value="SAN JOAQUÍN">SAN JOAQUÍN</option>
                  <option value="SAN MIGUEL">SAN MIGUEL</option>
                  <option value="SANTIAGO CENTRO">SANTIAGO CENTRO</option>
                  <option value="CARRILLOS">CARRILLOS</option>
                  <option value="CERRO NAVIA">CERRO NAVIA</option>
                  <option value="ESTACIÓN CENTRAL">ESTACIÓN CENTRAL</option>
                  <option value="LO ESPEJO">LO ESPEJO</option>
                  <option value="LO PRADO">LO PRADO</option>
                  <option value="MAIPÚ">MAIPÚ</option>
                  <option value="PEDRO AGUIERRE CERDA">PEDRO AGUIERRE CERDA</option>
                  <option value="PUDAHUEL">PUDAHUEL</option>
                  <option value="QUINTA NORMAL">QUINTA NORMAL</option>
                  <option value="SECTOR NORTE">SECTOR NORTE</option>
                  <option value="CONCHALÍ">CONCHALÍ</option>
                  <option value="HUECHURABA">HUECHURABA</option>
                  <option value="INDEPENDENCIA">INDEPENDENCIA</option>
                  <option value="QUILICURA">QUILICURA</option>
                  <option value="RECOLETA">RECOLETA</option>
                  <option value="RENCA">RENCA</option>
                  <option value="EL BOSQUE">EL BOSQUE</option>
                  <option value="LA CISTERNA">LA CISTERNA</option>
                  <option value="LA FLORIDA">LA FLORIDA</option>
                  <option value="LA GRANJA">LA GRANJA</option>
                  <option value="LA PINTANA">LA PINTANA</option>
                  <option value="PUENTE ALTO">PUENTE ALTO</option>
                  <option value="SAN BERNARDO">SAN BERNARDO</option>
                  <option value="SAN RAMÓN">SAN RAMÓN</option>
                  <option value="BUIN">BUIN</option>
                  <option value="CALERA DEL TANGO">CALERA DEL TANGO</option>
                  <option value="PAINE">PAINE</option>
                  <option value="COLINA">COLINA</option>
                  <option value="CHICUREO">CHICUREO</option>
                  <option value="LAMPA">LAMPA</option>
                  <option value="PADRE HURTADO">PADRE HURTADO</option>
                  <option value="TALAGANTE">TALAGANTE</option>
                  <option value="PEÑAFLOR">PEÑAFLOR</option>
                  <option value="PIRQUE">PIRQUE</option>
                  <option value="SAN JOSE DEL MAIPO">SAN JOSE DEL MAIPO</option>
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
                    {values.express ?
                      'Despacho express en 24 horas.' :
                      'Despacho normal de 24 a 48hrs habiles.'
                    }
                    <br></br>
                    {values.commune ?
                      `${values.express ? 'Valor por calcular.' : `Costo de envío estimado para ${values.commune}: $${shippingCosts[values.commune]}`}` :
                      'Selecciona una comuna para saber el costo de envío'
                    }
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.commune}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Check 
                  id="express"
                  name="express"
                  type="checkbox" 
                  label="Envio Express"
                  value={values.express}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Referencias/Notas</Form.Label>
                <Form.Control
                  id="notes"
                  name="notes"
                  type="text"
                  placeholder="Ejemplo: Dejar con conserje"
                  value={values.notes}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={email.sending}>
                {email.sending ?
                  <Spinner animation="border" variant="light" /> :
                  'Enviar Cotización'
                }
              </Button>
            </Form>
            )}
          </Formik>
      }
      </div>  
    </div>
  )
}