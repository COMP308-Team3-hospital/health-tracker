import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    name: String!
    gender: String!
    age: Int!
    roleId: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    signUp(
      username: String!
      password: String!
      email: String!
      name: String!
      gender: String!
      age: Int!
      roleId: String!
    ): Boolean
    signIn(username: String!, password: String!): Boolean
    signOut: Boolean
  }
`;

export default typeDefs;
