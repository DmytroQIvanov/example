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
    organization: "string",
    typ: "string",
    dfkv: "string",
    dlkv: "string",
    createdBy: "John",
    dmi: "string",
  },
  {
    id: "2",
    organization: "any",
    typ: "typ",
    dfkv: "03/10/2000",
    dlkv: "03/10/2003",
    createdBy: "Oliver",
    dmi: "03/10/2003",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "organizationType",
    label: "Organization Type / Organization",
    sortingBy: "organization",
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
    id: "createdBy",
    label: "Created By",
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
