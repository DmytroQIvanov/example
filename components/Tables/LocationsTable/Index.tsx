import React, { useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { Order } from "../TablesComponents/Interfaces/Order";
import { useRouter } from "next/router";

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    campus: "string",
    location1: "string",
    location2: "string",
    informationSource: "string",
    primary: true,
    comments: "string",
    dfkv: "string",
    dlkv: "string",
    dmi: "string",
  },

  {
    id: "2",
    campus: "string2",
    location1: "string3",
    location2: "string3",
    informationSource: "informationSource",
    primary: false,
    comments: "lorem",
    dfkv: "01/23/2022",
    dlkv: "13/13/2000",
    dmi: "01/01/2001",
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
    id: "primary",
    label: "Primary",
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
  const [tableElements, setTableElements] = useState(rows);
  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
  };

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
      buttonsList={[{ label: "Location Data Entry" }]}
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
