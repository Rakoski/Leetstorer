import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function createMockEnvironment() {
    const source = new RecordSource();
    const store = new Store(source);

    const network = Network.create(async (operation, variables) => {
        console.log(`Operation requested: ${operation.name}`, variables);

        if (operation.name === 'LoginMutation') {
            if (variables.email === 'test@example.com' && variables.password === 'password') {
                return {
                    data: {
                        login: {
                            userId: '1',
                            token: 'fake-token',
                            tokenExpiration: 3600,
                        },
                    },
                };
            } else {
                throw new Error('Invalid email or password');
            }
        }

        throw new Error(`Unhandled operation: ${operation.name}`);
    });

    return new Environment({ network, store });
}