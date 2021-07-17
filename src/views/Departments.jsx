import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Container, Row } from 'react-bootstrap'
import Breadcrumb from '../components/Breadcrumb'
import DeparmentCard from '../components/DeparmentCard'
import { DEPARTAMENTS } from '../graphql/queries/departamentos'
import Loader from '../components/Loader'

export default () => {
  const { loading, error, data } = useQuery(DEPARTAMENTS)

  if (loading) return <Loader />
  if (error) return <div>ERROR</div>

  return (
    <Fragment>
      <Breadcrumb />
      <Container fluid="lg">
        <Row className="justify-content-md-center">
          {
            data.departamentos.map((deparment, key) =>
              <DeparmentCard key={key} {...deparment} />
            )
          }
        </Row>
      </Container>
    </Fragment>
  )
}