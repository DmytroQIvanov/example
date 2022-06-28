import { gql, useQuery } from "@apollo/client";
import {
  Box,
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

interface DataTypes {
  person_order_id: Number;
  first_name?: String;
  middle_name?: String;
  last_name?: String;
  nickname?: String;
  order_id?: Number;
  order_state?: String;
  code?: String;
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

const initialSearchTitle = ["Name", "PID", "Unit", "Campus", "Employee ID"];

const SearchMenu: React.FC<{
  placeholder?: string;
  searchTitle?: string[];
}> = ({ placeholder = "Search Person", searchTitle = initialSearchTitle }) => {
  const [searchData, setSearchData] = React.useState("");

  const [visibility, setVisibility] = useState(false);
  const [block, setBlock] = useState(false);

  useEffect(() => {
    setVisibility(false);
    if (searchData.length >= 2) setVisibility(true);
  }, [searchData]);

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchData(event.target.value.toLowerCase().trim());
  };

  const { data } = useQuery(SEARCH_DATA);

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
      <div>
        <div
          style={{
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "500",
            backgroundColor: "rgba(136,136,136,0.09)",
          }}
          onClick={close}
        >
          <div
            style={{
              position: "fixed",
              // @ts-ignore
              left: inputRef.current?.getClientRects()[0].x,
              zIndex: "1000",
              // @ts-ignore
              top: inputRef.current?.getClientRects()[0].y,
            }}
          >
            {children}
          </div>
        </div>
      </div>
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
                          <Table sx={{ pt: "-22px" }}>
                            <TableHead>
                              <TableRow>
                                {searchTitle.map((elem) => (
                                  <TableCell key={elem}>
                                    <strong>{elem}</strong>
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <button onClick={() => alert()}>smth</button>
                              {data?.sample_person_order.map(
                                ({
                                  person_order_id,
                                  first_name,
                                  middle_name,
                                  last_name,
                                  nickname,
                                  order_id,
                                  order_state,
                                  code,
                                }: DataTypes) => {
                                  if (
                                    `${last_name} ${first_name} ${middle_name} ${nickname}`
                                      .toLowerCase()
                                      .includes(searchData)
                                  ) {
                                    return (
                                      <TableRow key={`${person_order_id}`}>
                                        {" "}
                                        <TableCell>
                                          {" "}
                                          {`${last_name || ""}, ${
                                            first_name || ""
                                          } ${middle_name || ""} ${
                                            nickname || ""
                                          }`}{" "}
                                        </TableCell>{" "}
                                        <TableCell>
                                          <>{person_order_id}</>
                                        </TableCell>{" "}
                                        <TableCell>
                                          <>{order_id || ""}</>
                                        </TableCell>{" "}
                                        <TableCell>{code || ""}</TableCell>{" "}
                                        <TableCell>
                                          {order_state || ""}
                                        </TableCell>{" "}
                                      </TableRow>
                                    );
                                  }
                                }
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
