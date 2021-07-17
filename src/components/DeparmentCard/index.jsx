import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Button } from 'react-bootstrap'
import Wrapper from './Style'

export default ({ id, nombre, fotos }) => {
  let history = useHistory()
  return (
    <Col xs={12} sm={12} md={4} lg={3} className="pb-4">
      <Wrapper url={fotos}>
        <Button 
          variant="light"
          onClick={() => history.push(`productos/${id}`)}
        >
          {nombre}
        </Button>
      </Wrapper>
    </Col>  
  )
}

