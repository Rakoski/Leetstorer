import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

export const startMongoMemoryServer = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    client = new MongoClient(uri);
    await client.connect();
};

export const stopMongoMemoryServer = async () => {
    await client.close();
    await mongoServer.stop();
};

export const getMongoClient = () => client;