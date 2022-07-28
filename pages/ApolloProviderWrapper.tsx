import React, { ReactNode } from "react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
// import { useUser } from '@clerk/clerk-react'
import { setContext } from "@apollo/client/link/context";
import {
  HttpLink,
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";
import { FiLogOut, FiShuffle } from "react-icons/fi";
import Typography from "@mui/material/Typography";

const ApolloProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();

  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken({ template: process.env.NEXT_PUBLIC_CLERK_TEMPLATE_NAME });
    // console.log("Hasura token is");
    // console.log(token);

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
        "x-hasura-role": `${user?.unsafeMetadata.role}`,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  });
  // console.log("userRole", user);

  const apolloClient = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
  if (!user?.unsafeMetadata.role)
    return (
      <div className={"app-selection"}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: "18px", width: "30vw" }}>
            Your role has not been assigned yet. Please contact an administrator
            for further assistance
          </Typography>
          <li style={{ marginTop: "25px", display: "flex" }}>
            <div
              className="iocn-link"
              onClick={() => signOut()}
              // style={{ margin: "auto" }}
            >
              <a href="">
                <FiLogOut className="react-icon" />
                <span className="link_name">Logout</span>
              </a>
            </div>
          </li>
        </Box>
      </div>
    );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
