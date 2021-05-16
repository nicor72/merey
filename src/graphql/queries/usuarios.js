import { gql } from "apollo-boost"

export const FIND_USER = gql`
  query findUser($email: String!) {
    usuarios(limit: 1, where: {email: {_eq: $email}}) {
      id
    }
  }
`