import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ReusableComponent from "./ReusableComponent";
import { ColorLabel } from "./ColorLabel";
import styles from "./styles.module.css";

const CollapsedPersonSummary = ({
  row2Title,
  row1Title,
  rowSubTitle,
  personDataState,
  reusableComponentObject,
  data,
  index,
  textOnLabels,
  subIndex,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>{row2Title.aid}</strong>
              </TableCell>
              <TableCell>
                <strong>{row1Title.name}</strong>
              </TableCell>

              <TableCell>
                <strong>{row1Title.cohort}</strong>
              </TableCell>
              <TableCell>
                <strong>{row2Title.type}</strong>
              </TableCell>
              <TableCell>
                <strong>{rowSubTitle.location}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={styles.tableRow}>
              <TableCell sx={{ textAlign: "left !important" }}>
                {personDataState?.person_id}
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left !important",
                  display: "flex !important",
                  minWidth: "250px",
                }}
              >
                <ReusableComponent
                  {...reusableComponentObject}
                  name={"last_name"}
                  coma
                />
                <ReusableComponent
                  {...reusableComponentObject}
                  name={"first_name"}
                  coma
                />
                <ReusableComponent
                  {...reusableComponentObject}
                  name={"middle_names"}
                  coma
                />
                <ReusableComponent
                  {...reusableComponentObject}
                  name={"nick_name"}
                />
              </TableCell>
              <TableCell>{/*COHORT*/}</TableCell>
              <TableCell>
                <ReusableComponent
                  {...reusableComponentObject}
                  name={"person_type.person_type"}
                />
                {/*{data?.sample_person[index].user_accounts.map(*/}
                {/*  (*/}
                {/*    { account_location }: { account_location?: Number },*/}
                {/*    key: number*/}
                {/*  ) => (*/}
                {/*    <span key={`${account_location || key}`}>*/}
                {/*      <span>{`${account_location}`}</span>*/}
                {/*      <span>*/}
                {/*        {index <*/}
                {/*        data?.sample_person[index].user_accounts?.length - 1*/}
                {/*          ? ", "*/}
                {/*          : ""}*/}
                {/*      </span>*/}
                {/*    </span>*/}
                {/*  )*/}
                {/*)}*/}
              </TableCell>
              <TableCell>
                {
                  personDataState?.person_campuses[subIndex].area.super_area
                    .super_area
                }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          marginTop: "35px",
        }}
      >
        {textOnLabels.map((elem, key) => (
          <Box sx={{ fontSize: "13px", p: "0 1px" }} key={key}>
            <ColorLabel type={key} text={elem} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CollapsedPersonSummary;
