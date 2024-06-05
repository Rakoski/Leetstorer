import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";
import Cookies from "js-cookie";

const HTTP_ENDPOINT =
    import.meta.env.VITE_PRODUCTION == "true" ?
        import.meta.env.VITE_PRODUCTION_URL + "/graphql"
        : "http://localhost:4000/graphql";

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

const environment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});

export default environment;
