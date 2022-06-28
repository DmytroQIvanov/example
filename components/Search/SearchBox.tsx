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

const searchTitle = {
  name: "Name",
  id: "PID",
  orderID: "Unit",
  code: "Campus",
  state: "Employee ID",
};

const SearchMenu: React.FC<{ placeholder?: string }> = ({
  placeholder = "Search Person",
}) => {
  const [searchData, setSearchData] = React.useState("");

  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (searchData.length >= 2) setVisibility(true);
  }, [searchData]);

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchData(event.target.value.toLowerCase().trim());
  };

  const { data } = useQuery(SEARCH_DATA);

  return (
    <>
      <BootstrapInput
        className="input-white"
        placeholder={placeholder}
        type="search"
        onChange={(event) => handleSearch(event)}
      />
      {visibility ? (
        <TableContainer className={styles.searchContainer}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box className={styles.result}>
                    <TableContainer>
                      <Table sx={{ pt: "-22px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <strong>{searchTitle.name}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.id}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.orderID}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.code}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.state}</strong>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
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
                                    <TableCell>{order_state || ""}</TableCell>{" "}
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
      ) : (
        ""
      )}
    </>
  );
};

export default SearchMenu;
