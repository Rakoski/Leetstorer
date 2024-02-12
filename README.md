# Leetcode Storage App

This project is a leetcode problem storage web app built using Turborepo, Relay, TypeScript, Node.js, React.js, GraphQL, and MongoDB. It allows users to store and organize their leetcode problems they have solved. This is meant as a training project for those technologies and woovi's training playground. 

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
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
- Turbo and turborepo installed (you can install it here: <code>npm install -g @turbo/turbo</code>)

### Configuration

1. Clone the repository:

     ```
     git clone https://github.com/Rakoski/leetcode-problem-storer.git

2. Navigate to the project directory:

     ```
     cd my-turborepo
3. Install dependencies for both the server and client:

    ```
    pnpm install
    pnpm build
    pnpm dev
4. Testing and linting

    ```
    pnpm lint
    pnpm test
5. Start the project

    ```
    turbo build dev
## Project Structure

The project is organized with turborepo:

<code>
.idea/
my-turborepo/
    |- apps/
          |- admin/
                |- public/
                      |- favicon.ico
                |- src/
                      |- app/
                           |- components/
                               |- Dashboard/
                                    |- index.tsx
                                    |- styles.css
                               |- Login/
                                    |- index.tsx
                                    |- styles.css
                               |- Registration/
                                    |- index.tsx
                                    |- styles.css
                               |- app.tsx
                           |- mutations/
                               |- CreateUserMutation.ts
                               |- LoginMutation.ts
                           |- RelayEnvironment.ts
                           |- constants.ts
                           |- index.css
                           |-  main.tsx
                           |- schema.graphql
                      |- index.css
                      |- main.tsx
                |- .eslintrc.js
                |- .gitattributes
                |- index.html
                |- package.json
                |- relay.config.json
                |- turbo.json
                |- vite.config.ts
                |- tsconfig.json
          |- api/
                |- src/
                    |- __tests__/
                        |- server.test.ts    
                    |- graphql/
                        |- resolvers/
                            |- utils/
                                |- problemCreator.ts
                                |- problemInterface.ts
                                |- userCreator.ts
                                |- userInterface.ts
                            |- problemResolver.ts
                            |- userResolver.ts
                        |- schema/
                            |- index.ts 
                    |- middleware/
                        |- is-auth.ts 
                    |- models/
                        |- problem.ts
                        |- user.ts
                    |- graphql.ts
                    |- index.ts
                    |- server.ts
                |- .env
                |- .eslintrc.js
                |- package.json
                |- tsconfig.json
                |- tsup.config.ts
                |- turbo.json
          |- blog/
                |- app/
                      |- routes/
                          |- styles.css
                      |- entry.client.tsx
                      |- entry.server.tsx
                      |- root.tsx
                      |- styles.css
                |- public/
                      |- favicon.ico
                |- .eslintrc.js
                |- README.md
                |- package.json
                |- remix.config.js
                |- remix.env.d.ts
                |- server.js
                |- tsconfig.json
                |- turbo.json
          |- storefront/
                |- src/
                      |- app/
                          |- layout.tsx
                          |- page.tsx
                          |- styles.css
                      |- styles.css
                |- public/
                      |- favicon.ico
                |- .eslintrc.js
                |- README.md
                |- package.json
                |- remix.config.js
                |- remix.env.d.ts
                |- server.js
                |- tsconfig.json
                |- turbo.json
    |- packages/
          |- config-eslint/
              |- README.md
              |- index.js
              |- next.js
              |- package.json
              |- react.js
              |- remix.js
              |- server.js
          |- config-typescript/
              |- base.json
              |- nextjs.json
              |- react-app.json
              |- package.json
              |- react-library.json
              |- remix.json
              |- vite.json
          |- jest-presets/
              | - jest/
              | - package.json
          |- logger/
                  | - src/
                      | - __tests__/
                          | - log.tests.ts
                      |- userResolver.ts
              |- base.json
              |- nextjs.json
              |- react-app.json
              |- package.json
              |- react-library.json
          |- ui/
              |- src/
                  |- index.tsx
                  |- CounterButton/
                      |- index.test.tsx
                      |- index.tsx
                  |- Link/
              |- .eslintrc.js
              |- package.json
              |- tsconfig.json
              |- tsup.config.ts
              |- turbo.json
    |- eslintrc.js
    |- turbo.json
    |- package.json
    |- tsconfig.json
    |- packages/
    |- .turbo/
      |- config.json
    |- .npmrc
    |- pnpm-lock.yaml
    |- pnpm-workspace.yaml
    |- package.json
    |- turbo.json
    |- tsconfig.json
.gitignore
package.json
README.md
</code>

## Configuration

My configuration will be here once everything is completed.

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
        frequency: 5
        link: "https://leetcode.com/problems/two-sum/"
        data_structure: "Array"
        date: "2023-12-31T00:00:00.000Z"
      }) {
        _id
        title
        level
        description
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
            frequency
            link
            data_structure
            date
        }
    }

## Schema Documentation

    """
    Represents a programming problem in the system.
    """
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

    
    """
    Represents a user in the system.
    """
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String
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
    Input type for creating a new programming problem.
    """
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
    
    """
    Input type for creating a new user.
    """
    input UserInput {
        email: String!
        password: String!
    }
    
    """
    Root query for fetching data.
    """
    type RootQuery {
        problems: [Problem!]!  
        users: [User!]!  
    }
    
    """
    Root mutation for creating, updating, or deleting data.
    """
    type RootMutation {
        createProblem(problemInput: ProblemInput): Problem 
        createUser(userInput: UserInput): User  
        login(email: String!, password: String!): AuthData! 
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
- Node.js,
- Ts-node,
- TypeScript,
- React.js,
- GraphQL,
- MongoDB
- Turborepo
- Relay

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
