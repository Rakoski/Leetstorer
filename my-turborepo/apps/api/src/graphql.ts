import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const schema = require('./graphql/schema/index.ts')

const userResolvers = require('./graphql/resolvers/userResolver.ts')
const problemResolvers = require('./graphql/resolvers/problemResolver.ts')

const combinedResolvers = {
    ...userResolvers,
    ...problemResolvers,
};

const graphqlRouter = express.Router();

graphqlRouter.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: combinedResolvers,
    graphiql: true,
}));

export default graphqlRouter;
