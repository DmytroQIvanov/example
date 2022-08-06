import React from "react";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { useRouter } from "next/router";

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    campus: "Riwerside",
    organization1: "Departament",
    organization2: "Molecular and Cellular Biology",
    informationSource: "Debrief",
    primary: true,
    comments:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dfkv: "01/02/2021",
    dlkv: "string1",
    dmi: "02/03/2013",
  },
  {
    id: "2",
    campus: "RSiwerside",
    organization1: "Deparadtament",
    organization2: "sMolecular and Cellular Biology",
    informationSource: "Rued",
    primary: false,
    comments:
      "Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dfkv: "04/12/2031",
    dlkv: "string12",
    dmi: "02/03/2012",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "campus",
    numeric: true,
    label: "Campus",
  },
  {
    id: "organization",
    numeric: false,
    label: "Organization",
    sortingBy: "organization1",
  },
  {
    id: "informationSource",
    numeric: false,
    label: "Information Source",
  },
  {
    id: "primary",
    numeric: false,
    label: "Primary",
  },
  {
    id: "comments",
    numeric: false,
    label: "Comments",
    width: "400px",
  },
  {
    id: "dfkv",
    numeric: false,
    label: "DFKV",
  },
  {
    id: "dlkv",
    numeric: false,
    label: "DLKV",
  },
  {
    id: "dmi",
    numeric: false,
    label: "DMI",
  },
  {
    id: "options",
    numeric: false,
    label: "Options",
  },
];

const AffiliationTable = () => {
  const router = useRouter();
  // const {
  //   tableElements,
  //   refetch,
  //   functions: { createFunction, deleteFunction, changeFunction },
  //   alert: { setSuccessAlert, successAlert },
  //   error: { setErrorMessage, errorMessage },
  // } = UseTableValues({
  //   tableNames: {
  //     tableName: "person_home_address",
  //     idName: "person_home_address_id",
  //   },
  //   schemas: {
  //     changeSchema: UPDATE_HOME_ADDRESS,
  //     createSchema: CREATE_HOME_ADDRESS,
  //     deleteSchema: DELETE_PERSON_HOME_TABLE,
  //     querySchema: HOME_ADDRESS_TABLE,
  //   },
  // });
  return (
    <TableWrapper
      rows={rows}
      // onSaveFunction={onCreateFunction}
      // onChangeFunction={onChangeFunction}
      // deleteFunction={onDeleteFunction}
      // refetch={refetch}
      // errorMessage={errorMessage}
      headCells={headCells}
      TableRowComponent={TableRowComponent}
    />
  );
};

export default React.memo(AffiliationTable);
