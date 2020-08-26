import React from 'react'
import { Spinner } from 'react-bootstrap'
import Wrapper from './Style'

export default () =>
  <Wrapper className="parent">
    <Spinner animation="grow" variant="success" />
    <Spinner animation="grow" variant="danger" />
    <Spinner animation="grow" variant="light" />
    <Spinner animation="grow" variant="warning" />
    <Spinner animation="grow" variant="info" />
  </Wrapper>