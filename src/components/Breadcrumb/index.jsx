import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Breadcrumb } from 'react-bootstrap'
import { DEPARTAMENTS_BY_ID } from '../../graphql/queries/departamentos'
import Wrapper from './Style'

export default () => {
  let { deparment, productId } = useParams()

  const { data } = useQuery(DEPARTAMENTS_BY_ID, { variables: { deparmentId: parseInt(deparment, 10) } })

  return (
    <Wrapper>
      <Breadcrumb>
        <Breadcrumb.Item href="/">INICIO</Breadcrumb.Item>
        <Breadcrumb.Item href="/productos">
          PRODUCTOS
        </Breadcrumb.Item>
        {
          data && data.departamentos_by_pk &&
            <Breadcrumb.Item 
              href={`/productos/${data.departamentos_by_pk.id}`}
              active={productId ? false : true}
            >
              {data.departamentos_by_pk.nombre}
            </Breadcrumb.Item>
        }
      </Breadcrumb>
    </Wrapper>
  )
}