import React, { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Row, Col } from 'react-bootstrap'
import Breadcrumb from '../components/Breadcrumb'
import DeparmentCard from '../components/DeparmentCard'
import DEPARTAMENTS from '../graphql/queries/departamentos'

export default () => {
  const { loading, error, data } = useQuery(DEPARTAMENTS)

  if (loading) return <div>LOADING...</div>
  if (error) return <div>ERROR</div>

  return (
    <Fragment>
      <Breadcrumb />
      <Row className="justify-content-md-center">
          {
            data.departamentos.map((deparment, i) =>
              <Col key={i} xs={3} className="pb-4">
                <DeparmentCard {...deparment} />
              </Col>
            )
          }
      </Row>
    </Fragment>
  )
}