# Leetstorer, Storage App for Developer Studies

This project is a web app built for developers who want a platform to keep their studies neet and organized. Built using Turborepo, Relay modern, TypeScript, Node.js, React.js, GraphQL, and MongoDB. It allows users to store and organize their coding problems they have solved. This is meant as a training project for those technologies and woovi's training playground.

The website is available at: https://leetstorer.com

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Configuration](#configuration)
- [Schema](#schema)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#Contact)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 18.7.X or above)
- pnpm (version 8.X.X)
- MongoDB (running locally or a connection to a MongoDB instance)

### Configuration

1. Install turborepo:
   ```
   pnpm install turbo --global

2. Fork this repository to your machine

3. Clone the repository:

     ```
     git clone https://github.com/<YOUR_GITHUB_USERNAME>/Leetstorer.git

4. Navigate to the project directory:

     ```
     cd my-turborepo
5. Install dependencies for both the server and client:

    ```
    pnpm install
    pnpm build
    pnpm dev
6. Testing and linting

    ```
    pnpm lint
    pnpm test
7. Start the project

    ```
    turbo build dev
    
## Configuration

- Make sure to create a `.env` file in the api directory of the project
- To test, change the environment variables of the api to use testing elements, including a local mongodb instance
- then, launch the docker compose with the following command:
    ```
    docker-compose up
    ```



## API Documentation

### GraphQL Endpoint

The GraphQL API is accessible at:

- **Endpoint:** http://localhost:4000/graphql

Use this endpoint to interact with the Leetcode Storage App GraphQL API. You can make queries and mutations to manage your leetcode problems.

### Example Mutation

To create a new problem, you can use the following example mutation:

    mutation {
      createProblem(problemInput: {
        title: "Two Sum"
        level: "Easy"
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order."
        user_description: "This uses an array"
        frequency: 5
        link: "https://leetcode.com/problems/two-sum/"
        data_structure: "Array"
        date: "2023-12-31T00:00:00.000Z"
      }) {
        _id
        title
        level
        description
        user_description
        frequency
        link
        data_structure
        date
      }
    }

    query {
        problems {
            _id
            title
            level
            description
            user_description
            frequency
            link
            data_structure
            date
        }
    }

## Schema

    """
    Represents a programming problem in the system.
    """
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

    
    """
    Represents a user in the system.
    """
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        isAdmin: Boolean!
        createdProblems: [Problem!]
    }
    
    """
    Authentication data returned after a successful login.
    """
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    """
    Easy-to-add Problems that will appear as a dropdown
    """
    type ExistingProblems {
       _id: ID!
       number_title: String!
       existing_link: String!
       existing_description: String!
       existing_difficulty: String!
       existing_video: String
     }
        
    """
    Input type for creating a new programming problem.
    """
    input ProblemInput {
        title: String!
        level: String!
        description: String!
        frequency: Float!
        link: String!
        user_description: String
        data_structure: String!
        date: String
        userId: String!
    }
    
    """
    Input type for creating a new user.
    """
    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    """
    Easy-to-add Problems input
    """
     input ExistingProblemsInput {
       number_title: String!
       existing_link: String!
       existing_description: String!
       existing_difficulty: String!
       existing_video: String
     }
    
    """
    Root query for fetching data.
    """
      type RootQuery {
        problems: [Problem!]!
        users: [User!]!
        existingproblems: [ExistingProblems!]!
      }
    
    """
    Root mutation for creating, updating, or deleting data.
    """
      type RootMutation {
        createProblem(problemInput: ProblemInput!): Problem
        createUser(userInput: UserInput!): User
        createExistingProblems(existingProblemsInput: ExistingProblemsInput!): ExistingProblems
        clearExistingProblems: String
        login(email: String!, password: String!): AuthData!
        editProblem(problemInput: ProblemInput!, problemId: ID!): Problem
        getUserProblems(userId: ID!): [Problem!]!
        requestPasswordReset(email: String!): Boolean!
        resetPassword(token: String!, newPassword: String!): Boolean!
        associateUserWithProblem(userId: ID!, problemId: ID!): Problem
      }
    
    """
    Root schema that defines the available queries and mutations.
    """
    schema {
        query: RootQuery
        mutation: RootMutation
    }

## Technologies Used
- Pnpm 
- Node.js,
- TypeScript,
- React.js,
- GraphQL,
- MongoDB
- Turborepo
- Relay Modern

### Contributing
Feel free to contribute by opening issues or pull requests.

### License
This project is licensed under the MIT License.

### Contact

<div style"display: inline_block">
    <a href="mailto:mastrakoski@gmail.com"><img
            src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white"
            target="_blank"></a>
    <a href="https://www.linkedin.com/in/mateus-rakoski/" target="_blank"><img
            src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"
            target="_blank"></a>
</div>

