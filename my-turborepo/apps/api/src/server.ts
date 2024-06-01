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
        .use(json())
        .use(urlencoded({ extended: true }))
        .use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }))
        .use(isAuth)
        .use('/graphql', graphqlRouter);

    return app;
};
