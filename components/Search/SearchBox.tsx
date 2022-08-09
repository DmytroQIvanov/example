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
import { useRef } from "react";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { HeaderModal } from "../Headers/Components/Modal";
import { DocumentNode } from "graphql";

const initialSearchTitle = [
  { label: "Name", valueName: "full_name" },
  { label: "PID", valueName: "person_id", id: true },
  { label: "EID", valueName: "employee_id" },
  { label: "Unit", valueName: "" },
  { label: "Campus", valueName: "" },
];

const SearchMenu: React.FC<{
  placeholder?: string;
  searchTitle?: any[];
  search?: { schema: DocumentNode; name: string };
}> = ({
  placeholder = "Search Person",
  searchTitle = initialSearchTitle,
  search,
}) => {
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
      // href += "/persondataentry/homeaddress" + `/${id}`;
    }
    setVisibility(false);
    setSearchData("");
    router.push(href);
  };
  const queryData =
    search &&
    useQuery(search.schema, {
      skip: !searchData,
      variables: { search: searchData },
    });

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
          <HeaderModal
            isOpen={visibility}
            coverApp={visibility}
            close={() => setVisibility(false)}
            inputRef={inputRef}
          >
            <TableContainer
              className={styles.searchContainer}
              onClick={() => setBlock(true)}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box className={`${styles.result}`}>
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
                              {search &&
                                queryData &&
                                queryData.data?.[search.name].length == 0 && (
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
                              {search &&
                                queryData &&
                                queryData.data?.[search.name].map(
                                  (elem: any) => {
                                    return (
                                      <TableRow
                                        key={`${
                                          elem[searchTitleId?.valueName]
                                        }`}
                                        onClick={(e) => {
                                          goTo(
                                            e,
                                            elem[searchTitleId?.valueName]
                                          );
                                        }}
                                        sx={{
                                          textAlign: "left !important",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {searchTitle.map((searchTitleElem) => (
                                          <TableCell
                                            align={"left"}
                                            sx={{
                                              textAlign: "left !important",
                                            }}
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
                                  }
                                )}
                              {queryData?.loading && (
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
          </HeaderModal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchMenu;
