import React, { ReactNode } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
// import { useUser } from '@clerk/clerk-react'
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
  const { user } = useUser();
  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken({ template: "dev" });
    console.log("Hasura token is");
    console.log(token);
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        "x-hasura-role": `${user?.unsafeMetadata.role}`,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: "https://api.advancemarketingsolutions.net/v1/graphql",
  });
  console.log("userRole", user);

  const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
