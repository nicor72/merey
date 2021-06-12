import { gql } from "apollo-boost"

export const CREATE_ORDER = gql`
  mutation createOrder(
    $id_user: uuid!, 
    $products: jsonb!,
    $phone: String,
    $street: String,
    $number: String,
    $dept: String,
    $commune: String
  ) {
    insert_ordenes_one(object: {
      id_usuario: $id_user, 
      productos: $products,
      telefono: $phone,
      direccion: $street,
      numero: $number,
      depto: $dept,
      comuna: $commune
    }) {
      id
    }
  }
`