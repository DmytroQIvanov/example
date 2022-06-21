// @ts-nocheck
import type { NextPage } from "next";
import { useQuery, gql, useMutation } from "@apollo/client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { getPosts } from "../graphql/getPosts";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../lib/authcontext";
import useStyles from "./styles";

const INSERT_POST = gql`
  mutation MyMutation {
    insert_post_one(object: { title: "with auth" }) {
      title
      id
      user_id
    }
  }
`;

const Home = () => {
  const [userRole, setUseRole] = useState("blah");
  const [hasuraToken, setHasuraToken] = useState(null);
  const [url, setUrl] = useState("");
  const context = useContext(AuthContext);
  const { userId, getToken } = useAuth();
  const { user } = useUser();

  const classes = useStyles();

  // @ts-ignore
  context.userRole = user.unsafeMetadata.role;

  /*const [createPost, {data, loading, error}] = useMutation(INSERT_POST, {
    context: {
      "headers": {
        Authorization: `Bearer ${hasuraToken}`,
        "x-hasura-role": `${user.unsafeMetadata.role}`

      }

    }
  })*/

  /*const {data, loading, error} = getPosts("test2", "test")
  if (loading) return <div>loading...</div>
  if (error) return <div>an error occurred</div> */

  useEffect(() => {
    async function getHasuraToken() {
      const hasuraToken = await getToken({ template: "hasura" });
      setHasuraToken(hasuraToken);
    }
    if (hasuraToken) {
    } else {
      getHasuraToken();
    }
  }, [hasuraToken]);

  const handlePostButton = () => {
    // @ts-ignore
    const { data, loading, error } = getPosts(
      !hasuraToken,
      user.unsafeMetadata.role
    );
  };

  return <div className={classes.body}></div>;
};

export default Home;
