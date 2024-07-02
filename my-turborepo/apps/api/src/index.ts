import dotenv from 'dotenv';
import { createServer } from "./server";
import mongoose from 'mongoose';
import graphqlRouter from './graphql';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';
const port = isTestEnvironment ? 4001 : 4000;

const MONGODB_URI = isTestEnvironment ? process.env.TEST_MONGODB_URI : process.env.DEV_MONGODB_URI;

const server = createServer();

// @ts-ignore
mongoose.connect(process.env.PRODUCTION ? process.env.PRODUCTION_MONGODB_URI : MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        server.use(graphqlRouter);
        server.listen(port, () => {
            console.log(`API running on port ${port}`);
        });
    })
    .catch(err => {
        console.log("Error in MongoDB connection: ", err);
    });
