import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const schema = require('./graphql/schema/index.ts')
const rootValue = require('./graphql/resolvers/index.ts')

const graphqlRouter = express.Router();

graphqlRouter.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

export default graphqlRouter;
