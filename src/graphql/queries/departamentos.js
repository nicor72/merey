import { gql } from "apollo-boost"

export default gql`query deparments {
  departamentos(order_by: {nombre: asc}) {
    id
    nombre
  }
}`