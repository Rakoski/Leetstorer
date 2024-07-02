import {
    Environment,
    Network,
    RecordSource,
    Store,
    FetchFunction,
} from "relay-runtime";
import Cookies from "js-cookie";

const getTestApiUrl = () => {
    return "http://localhost:4001/graphql";
};

const HTTP_ENDPOINT = getTestApiUrl();

const fetchFn: FetchFunction = async (request, variables) => {
    const token = Cookies.get('GC_AUTH_TOKEN');

    const resp = await fetch(HTTP_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
            query: request.text,
            variables,
        }),
    });

    return await resp.json();
};

export const testEnvironment = new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
});
