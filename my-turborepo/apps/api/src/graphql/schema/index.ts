import {buildSchema} from "graphql";

module.exports = buildSchema(`
  scalar Date

  type Problem {
    _id: ID!
    title: String!
    level: String!
    description: String!
    user_description: String
    frequency: Float!
    link: String!
    data_structure: String!
    date: String
    creator: User!
  }
  
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    resetPasswordToken: String
    resetPasswordExpires: Date
    isAdmin: Boolean!
    createdProblems: [Problem!]
  }
  
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  
  type ExistingProblems {
    _id: ID!
    number_title: String!
    existing_link: String!
    existing_description: String!
    existing_difficulty: String!
    existing_video: String
  }
  
  input ProblemInput {
    title: String!
    level: String!
    description: String!
    user_description: String
    frequency: Float!
    link: String!
    data_structure: String!
    date: String
    userId: String!
  }
  
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  input ExistingProblemsInput {
    number_title: String!
    existing_link: String!
    existing_description: String!
    existing_difficulty: String!
    existing_video: String
  }

  type RootQuery {
    problems: [Problem!]!
    users: [User!]!
    existingproblems: [ExistingProblems!]!
  }

  type RootMutation {
     createProblem(problemInput: ProblemInput!): Problem
     createUser(userInput: UserInput!): User
     createExistingProblems(existingProblemsInput: ExistingProblemsInput!): ExistingProblems
     clearExistingProblems: String
     login(email: String!, password: String!): AuthData
     getUserProblems(userId: ID!): [Problem!]!
     requestPasswordReset(email: String!): Boolean!
     resetPassword(token: String!, newPassword: String!): Boolean!
     editProblem(problemInput: ProblemInput!, problemId: ID!): Problem
     associateUserWithProblem(userId: ID!, problemId: ID!): Problem
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
