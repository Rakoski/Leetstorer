import {Environment, Network, RecordSource, Store} from "relay-runtime";

export function createMockEnvironment() {
    const source = new RecordSource();
    const store = new Store(source);

    const network = Network.create(async (operation, variables) => {
        console.log(`Operation requested: ${operation.name}`, variables);

        throw new Error(`Unhandled operation: ${operation.name}`);
    });

    return new Environment({ network, store });
}
