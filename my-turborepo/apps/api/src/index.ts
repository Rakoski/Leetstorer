import { log } from "@repo/logger";
import { createServer } from "./server";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import graphqlRouter from './graphql';

dotenv.config();
const port = process.env.PORT;
const server = createServer();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        server.use(graphqlRouter);

        server.listen(port, () => {
            log(`api running on ${port}`);
        });
    })
    .catch(err => {
        console.log("Error in MongoDB connection: ", err);
    });