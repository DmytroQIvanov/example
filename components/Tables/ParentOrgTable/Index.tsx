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
    organizationType: "Type",
    organization: "Organization",
    dfkv: "07/21/2000",
    dlkv: "02/10/2002",
    dmi: "21/22/2013",
  },

  {
    id: "2",
    organizationType: "Organization",
    organization: "Type",
    dfkv: "04/21/2000",
    dlkv: "02/22/2002",
    dmi: "21/21/2003",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "organizationTypeOrganization",
    label: "Organization Type / Organization",
    sortingBy: "organizationType",
  },
  {
    id: "dfkv",
    label: "Date First Known Valid",
  },

  {
    id: "dlkv",
    label: "Date Last Known Valid",
  },
  {
    id: "dmi",
    label: "Date Marked Invalid",
  },
  {
    id: "options",
    label: "Options",
  },
];

const CampusTable = () => {
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

export default React.memo(CampusTable);
