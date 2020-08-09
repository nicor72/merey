import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ProductsList from './ProductsList'
import ProductDetail from './ProductDetail'
import Deparments from './Departments'

// import nuts from './../images/circle-nuts.png'

export default ({ match }) =>
  <Container fluid>
    <Route
      exact
      path={match.url}
      render={() => <Deparments />}
    />
    <Route
      exact
      path={`${match.url}/:deparment`}
      render={(props) => <ProductsList {...props}/>}
    />
    <Route
      path={`${match.url}/:deparment/:productId`}
      render={(props) => <ProductDetail {...props}/>}
    />
  </Container>