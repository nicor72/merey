import { gql } from "apollo-boost"

export const CREATE_USER = gql`
  mutation createUser($email: String!, $name: String!) {
    insert_usuarios_one(object: {email: $email, nombres: $name}) {
      id
    }
  }
`