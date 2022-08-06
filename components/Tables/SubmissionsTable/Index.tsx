import React from "react";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    date: "01/20/2002",
    type: "string",
    oldValue: "string",
    newValue: "string",
    createdBy: "string",
  },
  {
    id: "1",
    date: "01/20/2000",
    type: "Any",
    oldValue: "old",
    newValue: "new",
    createdBy: "Danic",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "date",
    label: "Date",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "oldValue",
    label: "Old Value",
  },
  {
    id: "newValue",
    label: "New Value",
  },
  {
    id: "createdBy",
    label: "Created By",
  },

  // {
  //   id: "options",
  //   label: "Options",
  // },
];

const Index = () => {
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
      disableAddBtn
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

export default React.memo(Index);
