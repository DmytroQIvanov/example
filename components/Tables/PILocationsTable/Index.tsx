import React, { useState } from "react";
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
    campus: "string",
    location1: "string",
    location2: "string",
    informationSource: "string",
    propagate: "string",
    comments: "string",
    dfkv: "01/02/2003",
    dlkv: "01/02/2005",
    dmi: "01/02/2001",
  },
  {
    id: "2",
    campus: "campus",
    location1: "location1",
    location2: "location2",
    informationSource: "informationSource",
    propagate: "propagate",
    comments: "comments",
    dfkv: "01/02/2002",
    dlkv: "01/02/2002",
    dmi: "01/02/2002",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "campus",
    label: "Campus",
  },
  {
    id: "location",
    label: "Location",
    sortingBy: "location1",
  },
  {
    id: "informationSource",
    label: "Information Source",
  },

  {
    id: "propagate",
    label: "Propagate",
  },

  {
    id: "comments",
    label: "Comments",
  },

  {
    id: "dfkv",
    label: "DFKV",
  },

  {
    id: "dlkv",
    label: "DLKV",
  },

  {
    id: "dmi",
    label: "DMI",
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
      buttonsList={[{ label: "Location Data Entry" }]}
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
