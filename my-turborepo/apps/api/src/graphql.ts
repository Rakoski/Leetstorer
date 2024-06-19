import express, {Router} from 'express';
import { graphqlHTTP } from 'express-graphql';

const schema = require('./graphql/schema/index.ts')

const userResolvers = require('./graphql/resolvers/userResolver.ts')
const problemResolvers = require('./graphql/resolvers/problemResolver.ts')
import existingProblemsResolver from "./graphql/resolvers/existingProblemsResolver.ts";

const combinedResolvers = {
    ...existingProblemsResolver,
    ...userResolvers,
    ...problemResolvers,
};

const graphqlRouter: Router = express.Router();

graphqlRouter.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: combinedResolvers,
    graphiql: true,
}));

export default graphqlRouter;
