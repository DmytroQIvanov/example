import React, { ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";
import { setContext } from "@apollo/client/link/context";
import {
  HttpLink,
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";

const ApolloProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getToken } = useAuth();

  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken({ template: "Hasura" });

    return {
      headers: { ...headers, authorization: `Bearer ${token}` },
    };
  });

  const httpLink = new HttpLink({
    uri: "https://api.advancemarketingsolutions.net/v1/graphql",
  });

  const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    // uri: "https://api.advancemarketingsolutions.net/v1/graphql",
    cache: new InMemoryCache(),

    headers: { "x-hasura-admin-secret": "grace_under_pressure" },
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
