import { gql, useQuery } from "@apollo/client";
import {
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { BootstrapInput } from "./Type";
import styles from "./styles.module.scss";
import { createPortal } from "react-dom";
import { useRef } from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

interface DataTypes {
  // person_order_id: Number;
  // first_name?: String;
  // middle_name?: String;
  // last_name?: String;
  // nickname?: String;
  // order_id?: Number;
  // order_state?: String;
  // code?: String;

  full_name: string;
  person_id: number;
  employee_id: number;
}

const SEARCH_DATA = gql`
  query sample_search_bar_query {
    sample_person_order {
      person_order_id
      first_name
      middle_name
      last_name
      nickname
      order_id
      order_state
      code
    }
  }
`;

const SEARCH_PERSON = gql`
  query person_search($search: String!) {
    fuzzy_search(args: { search_text: $search }) {
      person_id
      full_name
      employee_id
    }
  }
`;

const initialSearchTitle = [
  { label: "Name", valueName: "full_name" },
  { label: "Person ID", valueName: "person_id", id: true },
  { label: "Employee ID", valueName: "employee_id" },

  // {"PID", "Unit", "Campus", "Employee ID"
];

const SearchMenu: React.FC<{
  placeholder?: string;
  searchTitle?: any[];
}> = ({ placeholder = "Search Person", searchTitle = initialSearchTitle }) => {
  const [searchData, setSearchData] = React.useState("");

  const [visibility, setVisibility] = useState(false);
  const [block, setBlock] = useState(false);

  useEffect(() => {
    setVisibility(false);
    if (searchData.length >= 1) setVisibility(true);
  }, [searchData]);

  const searchTitleId = searchTitle.find((elemID) => elemID.id == true);

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchData(event.target.value.toLowerCase().trim());
  };

  const router = useRouter();
  const goTo = (e: any, id: string) => {
    e.preventDefault();
    let href = "";
    if (router.pathname.includes("[id]")) {
      href = router.pathname.replace("[id]", id);
    } else {
      href += router.pathname + `/${id}`;
    }
    setVisibility(false);
    setSearchData("");
    router.push(href);
  };
  const { data, error, loading } = useQuery(SEARCH_PERSON, {
    variables: { search: searchData },
  });
  const Modal = ({
    isOpen,
    coverApp,
    close,
    children,
  }: {
    isOpen: boolean;
    coverApp: boolean;
    close: () => void;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;
    const ModalDom = (
      <>
        <div
          style={{
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "100",
            backgroundColor: "rgba(136,136,136,0.09)",
          }}
          onClick={close}
        />

        <div
          style={{
            position: "absolute",
            // @ts-ignore
            left: inputRef.current?.getClientRects()[0].x,
            zIndex: "1000",
            // @ts-ignore
            top: inputRef.current?.getClientRects()[0].y,
            display: "block",
          }}
        >
          {children}
        </div>
      </>
    );
    if (!coverApp) return ModalDom;

    const target = document.body;
    return createPortal(ModalDom, target);
  };

  const inputRef = useRef();

  return (
    <>
      <BootstrapInput
        className="input-white"
        placeholder={placeholder}
        type="search"
        onChange={(event) => handleSearch(event)}
        ref={inputRef}
        onFocus={() => {
          if (searchData.length >= 1) setVisibility(true);
        }}
      />
      {visibility ? (
        <>
          <Modal
            isOpen={visibility}
            coverApp={visibility}
            close={() => setVisibility(false)}
          >
            <TableContainer
              className={styles.searchContainer}
              onClick={() => setBlock(true)}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box className={styles.result}>
                        <TableContainer>
                          <Table sx={{ pt: "-22px", position: "relative" }}>
                            <TableHead>
                              <TableRow>
                                {searchTitle.map((elem) => (
                                  <TableCell
                                    key={elem.valueName}
                                    sx={{ width: "115px", maxWidth: "115px" }}
                                  >
                                    <strong>{elem.label}</strong>
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data?.fuzzy_search.length == 0 && (
                                <Typography
                                  sx={{
                                    mt: "10px",
                                    ml: "15px",
                                    textAlign: "left !important",
                                  }}
                                >
                                  No results
                                </Typography>
                              )}
                              {data?.fuzzy_search.map((elem: any) => {
                                return (
                                  <TableRow
                                    key={`${elem[searchTitleId?.valueName]}`}
                                    onClick={(e) => {
                                      goTo(e, elem[searchTitleId?.valueName]);
                                    }}
                                    sx={{
                                      textAlign: "left !important",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {searchTitle.map((searchTitleElem) => (
                                      <TableCell
                                        align={"left"}
                                        sx={{ textAlign: "left !important" }}
                                      >
                                        {elem[searchTitleElem.valueName]}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                );
                                // if (
                                //   `${last_name} ${first_name} ${middle_name} ${nickname}`
                                //     .toLowerCase()
                                //     .includes(searchData)
                                // ) {
                                //   return (
                                //     <TableRow key={`${person_order_id}`}>
                                //       {" "}
                                //       <TableCell>
                                //         {" "}
                                //         {full_name}
                                //         {`${last_name || ""}, ${
                                //           first_name || ""
                                //         } ${middle_name || ""} ${
                                //           nickname || ""
                                //         }`}{" "}
                                //       </TableCell>{" "}
                                //       <TableCell>
                                //         <>{person_order_id}</>
                                //       </TableCell>{" "}
                                //       <TableCell>
                                //         <>{order_id || ""}</>
                                //       </TableCell>{" "}
                                //       <TableCell>{code || ""}</TableCell>{" "}
                                //       <TableCell>
                                //         {order_state || ""}
                                //       </TableCell>{" "}
                                //     </TableRow>
                                //   );
                                // }
                              })}
                              {loading && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: "0px",
                                    width: "100%",
                                  }}
                                >
                                  <LinearProgress />
                                </Box>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchMenu;
