import React from 'react'
import { useHistory } from "react-router-dom"
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const DeparmentCard = styled.div`
  height: 15em;
  text-align: center;
  background-image: url('https://scontent.fscl11-2.fna.fbcdn.net/v/t1.0-9/46493666_180939976190267_2553519092975796224_n.jpg?_nc_cat=102&_nc_sid=2d5d41&_nc_oc=AQkZqjSgHHWbsB4p0D02e31J_ZMDRwlFYHaow04gL6rWyeV4IUJI3g-v8q-8B7oS0eU&_nc_ht=scontent.fscl11-2.fna&oh=a5f161eb5d5dd4a909da93079f35d1d4&oe=5F1E47B1');
  background-size: cover;
  button {
    width: 25em;
    height: 5em;
    margin-top: 9em;
    opacity: 0.9;
    font-weight: 700;
  }
`

export default ({ id, nombre }) => {
  let history = useHistory()
  return (
    <DeparmentCard>
      <Button 
        variant="light"
        onClick={() => {history.push(`productos/${nombre}`)}}
      >
        {nombre}
      </Button>
    </DeparmentCard>
  )
}

