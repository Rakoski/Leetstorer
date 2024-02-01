import {buildSchema} from "graphql";

module.exports = buildSchema(`
    type Problem {
    _id: ID!
    title: String!
    level: String!
    description: String!
    frequency: Float!
    link: String!
    data_structure: String!
    date: String!
    creator: User!
  }
  
  type User {
    _id: ID!
    email: String!
    password: String
    createdProblems: [Problem!]
  }
  
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  
  input ProblemInput {
    title: String!
    level: String!
    description: String!
    frequency: Float!
    link: String!
    data_structure: String!
    date: String!
    userId: String!
  }
  
  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    problems: [Problem!]!
    users: [User!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
     createProblem(problemInput: ProblemInput): Problem
     createUser(userInput: UserInput): User
     associateUserWithProblem(userId: ID!, problemId: ID!): Problem
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);