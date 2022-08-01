import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import styles from "./styles.module.css";
import { dateOptions } from "../Tables/TablesComponents/EditableBlock/Components/dateOptions";

const SideComponent = ({
  personDataState,
  rowSubTitle,
  subIndex,
  data,
  handleSubIndex,
  fetchLoading,
  goTo1,
}) => {
  // console.log(personDataState?.person_campuses[subIndex]);
  return (
    <>
      {personDataState?.person_campuses?.length >= 1 ? (
        <Box
          sx={{
            p: 1,
            m: 2,
            border: "1px solid #000",
            borderRadius: "5px",
            flex: 1,
          }}
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow className={styles.tableRow}>
                  <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <strong>{rowSubTitle.name}: </strong>

                    {
                      personDataState?.person_campuses[subIndex]?.campus
                        ?.campus_name
                    }
                  </TableCell>
                </TableRow>
                <TableRow className={styles.tableRow}>
                  <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <strong>{rowSubTitle.type}: </strong>
                    {personDataState?.person_campuses[subIndex]?.area?.area}
                  </TableCell>
                </TableRow>
                <TableRow className={styles.tableRow}>
                  <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <strong>{rowSubTitle.location}: </strong>
                    {
                      personDataState?.person_campuses[subIndex]?.area
                        ?.super_area?.super_area
                    }
                  </TableCell>
                </TableRow>
                <TableRow className={styles.tableRow}>
                  <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <strong>{rowSubTitle.activeDate}: </strong>
                    {personDataState?.person_campuses[subIndex]?.turfid}
                  </TableCell>
                </TableRow>
                <TableRow className={styles.tableRow}>
                  <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <strong>{rowSubTitle.pmStatus}: </strong>
                    {data?.sample_person[subIndex].user_accounts[subIndex]
                      ?.is_pm
                      ? "Yes"
                      : "No"}
                  </TableCell>
                </TableRow>
                <TableRow className={styles.tableRow}>
                  <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <strong>{rowSubTitle.canEmail}: </strong>
                    {data?.sample_person[subIndex].user_accounts[subIndex]
                      ?.can_email
                      ? "Yes"
                      : "No"}
                  </TableCell>
                </TableRow>

                <TableRow className={styles.tableRow}>
                  <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0px 20px",
                        paddingBottom: "15px",
                      }}
                    >
                      <strong>{rowSubTitle.dfkv}: </strong>
                      {(() => {
                        const date = new Date(
                          personDataState?.person_campuses[
                            subIndex
                          ]?.date_last_known_valid
                        );
                        return (
                          <>{date?.toLocaleString("en-US", dateOptions)}</>
                        );
                      })()}

                      <Box
                        sx={{
                          textAlign: "right",
                          m: "auto 0px auto auto",
                          color: "#0400ff",
                          cursor: "pointer",
                        }}
                        className={"disable-select"}
                        onClick={() => handleSubIndex()}
                      >
                        {(() => {
                          if (personDataState?.person_campuses?.length == 1)
                            return (
                              <>{personDataState?.person_campuses?.length}</>
                            );
                          return (
                            <>
                              {subIndex + 1} of{" "}
                              {personDataState?.person_campuses?.length} &gt;
                            </>
                          );
                        })()}
                      </Box>
                    </Box>
                    <Button
                      style={{
                        backgroundColor: "#6BAD43",
                        height: "30px",
                        fontSize: "14px",
                      }}
                      variant="contained"
                      onClick={() => goTo1("/persondataentry/research/")}
                    >
                      Campus Data Entry
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{
            p: 1,
            m: 2,
            border: "1px solid #000",
            borderRadius: "5px",
            flex: 1,
            display: "flex",
          }}
        >
          {fetchLoading ? (
            <Box sx={{ m: "auto", fontWeight: 600, color: "black" }}>
              <span>Loading...</span>
            </Box>
          ) : (
            <Box
              sx={{
                m: "auto",
                fontWeight: 600,
                color: "black",
              }}
            >
              <span>No Campus Affiliations</span>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default SideComponent;
