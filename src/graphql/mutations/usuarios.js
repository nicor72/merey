import { gql } from "apollo-boost"

export const CREATE_USER = gql`
  mutation createUser($email: String!, $names: String!) {
    insert_usuarios_one(object: {email: $email, nombres: $names}) {
      id
    }
  }
`