import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import bcrypt from "bcryptjs";
import {log} from "@repo/logger";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

const Problem = require('./models/problem');
const User = require('./models/user');

interface UserInterface {
    _doc: any;
    _id: ObjectId;
    email: string;
    createdProblems: mongoose.Types.ObjectId[];
}

interface ProblemInterface {
    _doc: any;
    _id: ObjectId;
    level: string;
    description: string;
    frequency: number;
    link: string;
    data_structure: string;
    date: string;
}

const problemCreator = async (problemIds: Array<unknown>): Promise<{ _id: ObjectId, level: string,
    description: string, frequency: number, link: string, data_structure: string, date: string, creator: string }> => {
    const problem: ProblemInterface | null = await Problem.find({_id: {$in: problemIds}})
        .then(problems => {
            return problems.map(problem => {
                return { ...problem._doc,
                    _id: problem.id,
                    creator: userCreator.bind(this, problem.creator)}
            })
        })
        .catch(err => {
            throw err
        })
}

const userCreator = async (userId: unknown): Promise<unknown> => {
    try {
        const user: UserInterface | null = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const populatedUser = {
            _id: user._doc._id.toString(),
            email: user.email,
            createdProblems: await problemCreator(user._doc.createdProblems)
        };

        return populatedUser;
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
    userId: String!
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
                    const populatedUserCreator = await userCreator(problem._doc.creator);
                    populatedProblems.push({
                        ...problem._doc,
                        _id: problem._id,
                        creator: populatedUserCreator
                    });
                }
                return populatedProblems;
            })
            .catch((err: any) => {
                log("Error in fetching problems:", err);
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
                creator: '65ac1d594bd2d10bf82d9388',
            });

            const result = await problem.save();

            const user = await User.findById('65ac1d594bd2d10bf82d9388');
            if (user) {
                user.createdProblems.push(result._id);
                await user.save();
            } else {
                throw new Error("User doesn't exist");
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
