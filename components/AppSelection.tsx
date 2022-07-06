import { FaMap, FaUserAlt, FaRegMap } from "react-icons/fa";
import { BsTools, BsGear } from "react-icons/bs";
import { FiShuffle, FiUsers, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import Image from "next/image";
import Box from "@mui/material/Box";
// import { useClerk } from "@clerk/clerk-react";
import { useAuth, useClerk } from "@clerk/nextjs";
// import { useQuery } from "@apollo/react-hooks";
import {
  ApolloClient,
  from,
  gql,
  HttpLink,
  InMemoryCache,
  useApolloClient,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { GetUser } from "../shemas/GetPerson";

export function AppSelection() {
  const router = useRouter();
  const goTo = (e: any, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  // const client = useApolloClient();

  const qsad = gql`
    query GetPerson($search: String!) {
      fuzzy_search(args: { search_text: $search }) {
        person_id
        full_name
        employee_id
      }
    }
  `;

  const httpLink = new HttpLink({
    uri: "https://api.advancemarketingsolutions.net/v1/graphql",
  });
  const { getToken } = useAuth();

  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken({ template: "Hasura" });

    return {
      headers: { ...headers, authorization: `Bearer ${token}` },
    };
  });
  const client = new ApolloClient({
    uri: "https://api.advancemarketingsolutions.net/v1/graphql",
    cache: new InMemoryCache(),
  });
  // const apolloClient = new ApolloClient({
  //   cache: new InMemoryCache(),
  //
  // link: from([authMiddleware, httpLink]),
  // link: httpLink,
  // headers: { "x-hasura-admin-secret": "grace_under_pressure" },
  // });

  const { data, error } = useQuery(qsad, {
    // query: qsad,
    variables: { search: "Ivan" },
    // client,
  });
  console.log(data);
  console.log(error);
  const customImgLoader = ({ src }: { src: any }) => {
    return `${src}`;
  };

  const { signOut } = useClerk();

  //later to use
  return (
    <div className="app-selection">
      <div>
        <div className="title">
          <div style={{ display: "flex", marginBottom: "14px" }}>
            <Box style={{ margin: "auto", display: "flex" }}>
              <Image
                loader={customImgLoader}
                alt="Avatar"
                width={64}
                height={64}
                src={"https://via.placeholder.com/50"}
              />
            </Box>
          </div>
          App Selection
        </div>
        <div className="selections">
          <ul className="nav-links">
            <li>
              <div className="iocn-link">
                <a
                  href="#"
                  onClick={(e) => goTo(e, "/persondataentry/homeaddress")}
                >
                  <FaUserAlt className="react-icon" />
                  <span className="link_name">Person Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a
                  href="#"
                  onClick={(e) =>
                    goTo(e, "/organizationdataentry/locationsdataentry")
                  }
                >
                  <FiUsers className="react-icon" />
                  <span className="link_name">Organization Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, "/pidataentry/locations")}>
                  <FiShuffle className="react-icon" />
                  <span className="link_name">PI Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, "/locationdataentry")}>
                  <FaRegMap className="react-icon" />
                  <span className="link_name">Location Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, "/utilities")}>
                  <BsTools className="react-icon" />
                  <span className="link_name">Utilities</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, "/settings")}>
                  <BsGear className="react-icon" />
                  <span className="link_name">Settings</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link" onClick={() => signOut()}>
                <a href="#">
                  <FiLogOut className="react-icon" />
                  <span className="link_name">Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
