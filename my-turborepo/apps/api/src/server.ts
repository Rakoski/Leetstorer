import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import graphqlRouter from './graphql';
import isAuth from './middleware/is-auth';

export const createServer = (): Express => {
    const app = express();

    app
        .disable('x-powered-by')
        .use(morgan('dev'))
        .use(cors({
            origin: '*',
            methods: ['POST', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }))
        .use(json())
        .use(urlencoded({ extended: true }))
        .use(isAuth)
        .use('/graphql', graphqlRouter);

    return app;
};
