import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`

export default () =>
  <Wrapper className="parent">
    <Spinner animation="grow" variant="primary" />
    <Spinner animation="grow" variant="secondary" />
    <Spinner animation="grow" variant="success" />
    <Spinner animation="grow" variant="danger" />
    <Spinner animation="grow" variant="warning" />
    <Spinner animation="grow" variant="info" />
    <Spinner animation="grow" variant="light" />
    <Spinner animation="grow" variant="dark" />
  </Wrapper>