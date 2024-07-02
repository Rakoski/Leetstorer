import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

export const startMongoMemoryServer = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri: string = mongoServer.getUri();
    client = new MongoClient(uri);
    await client.connect();
    return client;
};

export const stopMongoMemoryServer = async () => {
    if (client) {
        await client.close();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
};

export const getMongoClient = () => client;