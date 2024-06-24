import { log } from "@repo/logger";
import { createServer } from "./server";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import graphqlRouter from './graphql';

dotenv.config();
const port = process.env.PORT;
const server = createServer();

let MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    log("MONGODB_URI is not defined");
    process.exit(1);
}
mongoose.connect(MONGODB_URI)
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