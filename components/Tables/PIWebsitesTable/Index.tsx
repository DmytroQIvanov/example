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

    url: "string",
    comments: "string",
    crawl: false,
    dfkv: "string",
    dlkv: "string",
    dmi: "string",
  },
  {
    id: "2",

    url: "https://google.com/",
    comments: "Lorem LoremLoremLorem LoremLoremLorem LoremLorem",
    crawl: true,
    dfkv: "01/20/2022",
    dlkv: "01/20/2022",
    dmi: "01/20/2022",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "url",
    label: "URL/Comments",
  },
  {
    id: "crawl",
    label: "Crawl",
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
      buttonsList={[{ label: "Add New Website" }]}
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
