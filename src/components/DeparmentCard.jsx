import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Button } from 'react-bootstrap'
import styled from 'styled-components'

const DeparmentCard = styled.div`
  height: 15em;
  text-align: center;
  background-image: url('https://lh3.googleusercontent.com/pw/ACtC-3cj8BtAd9Zm0zPwjuWzG3sa-_U_RtUFWDgdXWi7yu1KHE--axtUO08_2c6cylzVaoAExd0eDIubdcezwtLQapZic8CO0CBGZw36aUuWbx-8aTsW2apGoJty8rxnWjcW5gjb5BpARgC8WaEUxxt4o36X=w1560-h908-no?authuser=1');
  background-size: cover;
  background-position: center;
  button {
    width: 100%;
    height: 30%;
    margin-top: 9em;
    opacity: 0.9;
    font-weight: 700;
  }
`

export default ({ id, nombre }) => {
  let history = useHistory()
  return (
    <Col xs={12} sm={12} md={4} lg={3} className="pb-4">
      <DeparmentCard>
        <Button 
            variant="light"
            onClick={() => {history.push(`productos/${nombre}`)}}
        >
            {nombre}
        </Button>
      </DeparmentCard>
    </Col>  
  )
}

