import { gql } from "apollo-boost"

export const CREATE_ORDER = gql`
  mutation createOrder($id_user: uuid!, $products: jsonb!) {
    insert_ordenes_one(object: {id_usuario: $id_user, productos: $products}) {
      id
    }
  }
`