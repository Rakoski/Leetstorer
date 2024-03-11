import {buildSchema} from "graphql";

module.exports = buildSchema(`
    type Problem {
    _id: ID!
    title: String!
    level: String!
    description: String!
    user_description: String!
    frequency: Float!
    link: String!
    data_structure: String!
    date: String!
    creator: User!
  }
  
  type User {
    _id: ID!
    username: String!
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
    username: String!
    email: String!
    password: String!
  }

  type RootQuery {
    problems: [Problem!]!
    users: [User!]!
  }

  type RootMutation {
     createProblem(problemInput: ProblemInput): Problem
     createUser(userInput: UserInput): User
     login(email: String!, password: String!): AuthData
     getUserProblems(userId: ID!): [Problem!]!
     associateUserWithProblem(userId: ID!, problemId: ID!): Problem
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);