import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
mutation signIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password)
}
`;

const REGISTER_MUTATION = gql`
  mutation SignUp(
    $username: String!
    $password: String!
    $email: String!
    $name: String!
    $gender: String!
    $age: Int!
    $roleId: String!
  ) {
    signUp(
      username: $username
      password: $password
      email: $email
      name: $name
      gender: $gender
      age: $age
      roleId: $roleId
    )
  }
`;

export { LOGIN_MUTATION, REGISTER_MUTATION };
