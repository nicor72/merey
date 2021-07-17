import React from 'react'
import ReactDOMServer from 'react-dom/server';
import emailjs from 'emailjs-com'
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PRODUCT_BY_ID } from '../graphql/queries/productos'
import { FIND_USER } from '../graphql/queries/usuarios'
import { CREATE_USER } from '../graphql/mutations/usuarios'
import { CREATE_ORDER } from '../graphql/mutations/ordenes'
import { useSelector, useDispatch } from 'react-redux'
import { Formik} from 'formik'
import { Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import ProductsTable from '../components/ProductsTable/ProductsTable'
import { shippingCosts } from '../components/ProductsTable/ProductTableConstants'

export default () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)

  const titleRef = React.useRef(null)
  
  const [email, setEmail] = React.useState({
    sending: false,
    sent: false,
    error: false
  })

  const productId = cart.reduce((acc, product) =>
    acc = [...acc, product.id]
    , [])

  const [ createUser ] = useMutation(CREATE_USER)
  const [ createOrder ] = useMutation(CREATE_ORDER)
  const { refetch } = useQuery(FIND_USER, { skip: true })
  const queryProducts = useQuery(PRODUCT_BY_ID, { variables: { productId } })

  if (queryProducts.data) {
    cart.map((productCart) => {
      const productDetails = queryProducts.data.productos.find(({ id }) => id === productCart.id)

      // const productState = initProductDetails(productDetails)

      // const formatosVenta = formato_venta.replace(',', '.').split(';')
      // const precioVenta = precio_venta * formatosVenta[0]

      // let prettyFormat = formatosVenta[0]
      // let variante = 'kg'
      // if (formatosVenta[0] < 1) {
      //   prettyFormat = formatosVenta[0] * 1000
      //   variante = 'grs'
      // }

      // product.precio_web = precioVenta
      // product.nombre = nombre
      // product.cantidad_disponible = cantidad_disponible
      // product.formato_web = prettyFormat
      // product.variante_web = variante
      // product.fotos = fotos

      const formatosWeb = productDetails.formato_web.split(',')
      const formatoVenta = productDetails.formato_venta.replace(',', '.')

      let price
      if (formatosWeb.length > 1) {
        price = (productDetails.precio_venta * (productCart.selectedFormatoWeb / 1000))
      } else {
        price = (productDetails.precio_venta * formatoVenta)
      }
      
      productCart.price = price.toFixed()

      return true
    })
  }

  if (!cart.length && !email.sent) {
    return(
      <Redirect to="/productos" />
    )
  }

  const formStyle = {
    paddingBottom: 300 + 'px',
    paddingTop: 30 + 'px'
  }

  const renderProductsTable = (shippingData) => {
    return (
      <ProductsTable 
        cart={cart}
        productsDetails={queryProducts.data.productos}
        shippingData={shippingData}
        totalPrice={cart.reduce((acc, { cantidad, price }) => 
          acc = acc + (cantidad * price)
        , 0)}
      />
    )
  }

  return (
    <div ref={titleRef} className="container medium-margin-top">
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
            onSubmit={async (values) => {

              values.products = ReactDOMServer.renderToString(renderProductsTable(values))
              const { email, name, phone, street, number, dept, commune } = values
              
              const existUser = await refetch({ email })

              let id_user = ''
              if (existUser.data.usuarios.length) {
                id_user = existUser.data.usuarios[0].id
              } else {
                const newUser = await createUser({
                  variables: {
                    email,
                    name
                  }
                })
                id_user = newUser.data.insert_usuarios_one.id
              }

              const order = await createOrder({
                variables: {
                  id_user,
                  products: JSON.stringify(cart),
                  phone: phone.toString(),
                  street,
                  number: number.toString(),
                  dept,
                  commune
                }
              })

              const orderNumber = order.data.insert_ordenes_one.id.toString().padStart(4, "0")
              values.order = `MT-${orderNumber}`

              setEmail({ sending: true, sent: false, error: false })

              emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE, process.env.REACT_APP_EMAILJS_TEMPLATE, values, process.env.REACT_APP_EMAILJS_USERID)
                .then((result) => {
                  setEmail({ sending: false, sent: true, error: false })
                  dispatch({ type: 'CLEAN_CART' })
                  titleRef.current.scrollIntoView({ block: "end", behavior: "smooth" })
                }, (error) => {
                  setEmail({ sending: false, sent: false, error: true })
                }
              )
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre y Apellido</Form.Label>
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
                  isValid={touched.express && !errors.express}
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
                  isValid={touched.notes && !errors.notes}
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