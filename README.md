# Leetcode Storage App

This project is a leetcode problem storage web app built using Turborepo, Relay, TypeScript, Node.js, React.js, Next.js, GraphQL, and MongoDB. It allows users to store and organize their leetcode problems they have solved. This is meant as a training project for those technologies and woovi's training playground. This readme.md IS INCOMPLETE, for now.

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
    - [Server](#server)
    - [Client](#client)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 18.7.X or above)
- pnpm (version 8.X.X)
- MongoDB (running locally or a connection to a MongoDB instance)
- Turbo and turborepo installed

### Configuratio

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

## Project Structure

The project is organized with turborepo:

<code>
.idea/
my-turborepo/
|- apps/
  |- admin/
    |- dist/
    |- public/
    |- src/
    |- .eslintrc.js
    |- index.html
    |- package.json
    |- tsconfig.json
    |- turbo.json
    |- vite.config.ts
|- packages/
  |- config-eslint/
      |- README.md
      |- index.js
      |- next.js
      |- package.json
      |- react.js
      |- remix.js
      |- server.js
  |- config-eslint/
  |- config-eslint/
  |- config-eslint/
  |- config-eslint/
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
