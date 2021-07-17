import { gql } from "apollo-boost"

export const DEPARTAMENTS = gql`
  query deparments {
    departamentos(order_by: {nombre: asc}) {
      id
      nombre
      fotos
    }
  }
`

export const DEPARTAMENTS_BY_ID = gql`
  query deparmentsById($deparmentId: smallint!) {
    departamentos_by_pk(id: $deparmentId) {
      id
      nombre
    }
  }
`