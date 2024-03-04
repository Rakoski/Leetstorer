import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

const store = new Store(new RecordSource())

const HTTP_ENDPOINT = "http://localhost:4000/graphql";

const fetchFn: FetchFunction = async (request, variables) => {
  const token = localStorage.getItem('GC_AUTH_TOKEN');

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

const envirionment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});

export default envirionment;
