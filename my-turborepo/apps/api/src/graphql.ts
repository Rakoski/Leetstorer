import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import bcrypt from "bcryptjs";
import {log} from "@repo/logger";
import {ObjectId} from "mongodb";

const Problem = require('./models/problem');
const User = require('./models/user');

interface User {
    _id: ObjectId;
    email: string;
}

const userCreator = async (userId: string): Promise<{ _id: string; email: string }> => {
    try {
        const user: User | null = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return {
            _id: user._id.toString(),
            email: user.email,
        };
    } catch (err) {
        throw err;
    }
};


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
    creator: User!
  }
  
  type User {
    _id: ID!
    email: String!
    password: String
    createdProblems: [Problem!]
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
    users: [User!]!
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
        return Problem.find()
            .then(async (problems: any[]) => {
                const populatedProblems = [];
                for (const problem of problems) {
                    const populateduserCreator = await userCreator(problem._doc.creator);
                    populatedProblems.push({
                        ...problem._doc,
                        _id: problem._id,
                        creator: populateduserCreator
                    });
                }
                return populatedProblems;
            })
            .catch((err: any) => {
                log("Error in fetching problems: ", err);
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

            log("Problem saved successfully");

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
    users: () => {
        log("Users: ")
        return User.find()
            .then((users: object[]) => {
                return users.map((user: { _doc: { _id: string }, _id: string, email: string }) =>
                    ({ ...user, _id: user._id.toString(), email: user.email }))
            })
            .catch((err: any) => {
                log("Error in querying a user: ", err);
                throw err;
            });
    },
    createUser: async (args: {userInput: {email: string; password: string}}) => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email});

            if (existingUser) {
                throw new Error("User already exists!");
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save();

            log("User created successfully");
            return { ...result, password: null, _id: result._id, email: result.email };
        } catch (err) {
            log("Error in createUser resolver: ", err);
            throw new Error("Error in creating user");
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
