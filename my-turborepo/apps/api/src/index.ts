import { log } from "@repo/logger";
import { createServer } from "./server";
import mongoose from 'mongoose';

import graphqlRouter from './graphql';

const port = 4000;
const server = createServer();

mongoose.connect("mongodb+srv://mastrakoski:CodigoLimpo03@first-cluster.zcakumz.mongodb.net/")
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