import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchQuery(operation, variables) {
    return fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const network = Network.create(fetchQuery);

const environment = new Environment({
    network,
    store: new Store(new RecordSource()),
});

export default environment;
