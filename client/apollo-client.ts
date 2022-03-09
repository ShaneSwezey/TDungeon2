import { ApolloClient, HttpLink, InMemoryCache, split, ApolloLink, Operation, FetchResult, Observable } from "@apollo/client";
import { print } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-ws';
import ws from 'isomorphic-ws';

import { getMainDefinition } from '@apollo/client/utilities';

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (Array.isArray(err))
              // GraphQLError[]
              return sink.error(
                new Error(err.map(({ message }) => message).join(', ')),
              );

            if (err instanceof CloseEvent)
              return sink.error(
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`, // reason will be available on clean closes only
                ),
              );

            return sink.error(err);
          },
        },
      );
    });
  }
}

const wsLink = () => new WebSocketLink({
  url: `ws://api.tdungeon.quest/graphql`,
  webSocketImpl: ws,
});

const httpLink = () => new HttpLink({
  uri: `https://api.tdungeon.quest/graphql`,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink(),
  httpLink(),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  // caching is causing nested query issues, turn off for now
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});