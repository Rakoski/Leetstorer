import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import bcrypt from "bcryptjs";
import {log} from "@repo/logger";

const Problem = require('./models/problem');
const User = require('./models/user');

const schema: GraphQLSchema = buildSchema(`
    type Problem {
    _id: ID!
    title: String!
    level: String!
    description: String!
    frequency: Float!
    link: String!
    data_structure: String!
    date: String!
  }
  
  type User {
    _id: ID!
    email: String!
    password: String
  }
  
  input ProblemInput {
    title: String!
    level: String!
    description: String!
    frequency: Float!
    link: String!
    data_structure: String!
    date: String!
  }
  
  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    problems: [Problem!]!
  }

  type RootMutation {
     createProblem(problemInput: ProblemInput): Problem
     createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);


const rootValue = {
    problems: () => {
        log("Problems: ")
        return Problem.find()
            .then((problems: object[]) => {
                return problems.map((problem: { _doc: { _id: string }, _id: string }) =>
                    ({ ...problem, _id: problem._id.toString() }))
            })
            .catch((err: any) => {
                log("Error in saving a problem: ", err);
                throw err;
            });
    },
    createProblem: async (args: { problemInput: { title: string; description: string; level: string; frequency: number; link: string; data_structure: string; date: string } }) => {
        try {
            const { title, description, level, frequency, link, data_structure, date } = args.problemInput;

            const problem = new Problem({
                title,
                description,
                level,
                frequency,
                link,
                data_structure,
                date: new Date(date),
                creator: '658551a1b92599c7aedb9bd4',
            });

            const result = await problem.save();
            const user = await User.findById('658551a1b92599c7aedb9bd4');

            if (!user) {
                throw new Error("User doesn't exist")
            }

            log("Problem saved successfully", { doc: result, _id: result._id.toString() });

            return {
                _id: result._id.toString(),
                title: result.title,
                level: result.level,
                description: result.description,
                frequency: result.frequency,
                link: result.link,
                data_structure: result.data_structure,
                date: result.date.toString(),
                creator: user
            };
        } catch (err) {
            log("Error in saving a problem: ", err);
            throw err;
        }
    },
    createUser: async (args: {userInput: {email: string; password: string}}) => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email});

            if (existingUser) {
                return {
                    error: {
                        message: "User already exists!",
                        code: 'USER_ALREADY_EXISTS',
                    },
                };
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();

            return {...result, _id: result.id, password: null };
        } catch (err) {
            log("Error in createUser resolver: ", err);
            return {
                error: {
                    message: "Error in creating user",
                    code: 'CREATE_USER_ERROR',
                },
            };
        }
    },
}

const graphqlRouter = express.Router();

graphqlRouter.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

export default graphqlRouter;
