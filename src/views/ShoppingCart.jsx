import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

export default () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)

  return (
    <Container>
      <div>SHOPPING CART</div>
      <ul>
        {
          cart.map(({codigo, nombre_de_productos}) =>
            <li key={codigo}>
              {nombre_de_productos}
              <button 
                onClick={() => dispatch({type: 'REMOVE_PRODUCT', codigo})}
              >
                Quitar
              </button>
            </li>
          )
        }
      </ul>
    </Container>
  )
}