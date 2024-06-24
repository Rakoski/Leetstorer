import '@testing-library/jest-dom';

import { startMongoMemoryServer, stopMongoMemoryServer } from './src/__mocks__/test_utils/mongoMemoryServer';

beforeAll(async () => {
    await startMongoMemoryServer();
});

afterAll(async () => {
    await stopMongoMemoryServer();
});