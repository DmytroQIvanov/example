import React, { useState } from "react";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
  // @ts-ignore
} from "./interfaces";
// @ts-ignore
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { Order } from "../TablesComponents/Interfaces/Order";
import { useRouter } from "next/router";

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",

    researchComments: "string",
    date: "string",
    createdBy: "string",
  },
  {
    id: "2",

    researchComments: "researchComments",
    date: "01/22/2011",
    createdBy: "Dmytro",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "researchComments",
    label: "Research Comments",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "createdBy",
    label: "Created By",
  },

  {
    id: "options",
    label: "Options",
  },
];

const Index = () => {
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
export default React.memo(Index);
