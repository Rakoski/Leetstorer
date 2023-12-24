import { json, urlencoded } from "body-parser";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import graphqlRouter from './graphql';

export const createServer = (): Express => {
    const app = express();
    app
        .disable("x-powered-by")
        .use(morgan("dev"))
        .use(json())
        .use(cors())
        .use('/graphql', graphqlRouter)

    return app;
};
