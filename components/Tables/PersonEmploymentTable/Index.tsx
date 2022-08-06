import React from "react";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import TableWrapper from "../TablesComponents/TableWrapper/Index";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { useRouter } from "next/router";

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    jobTitle: "DNMAJ-ADUH-NADMі",
    campus: "smth",
    source: "string3",
    unit: "string4",
    dateStart: "01/05/2021",
    dateEnd: "02/06/2021",
    apt: "50 %",
    salary: "21.413141",
    comments:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dfkv: "01/02/2021",
    dlkv: "02/03/2016",
    dmi: "02/03/2013",
  },
  {
    id: "2",
    jobTitle: "DNMA3-ADUH-NADM",
    campus: "smth4",
    source: "string5",
    unit: "string6",
    dateStart: "07/08/2021",
    dateEnd: "02/03/2025",
    apt: "30 %",
    salary: "43.424141",
    comments:
      "Lorem smth ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dfkv: "01/12/2021",
    dlkv: "02/03/2014",
    dmi: "02/03/2013",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "jobTitle",
    numeric: true,
    label: "Job Title",
  },
  {
    id: "unit",
    numeric: false,
    label: "Unit",
  },
  {
    id: "datesStartDateEnd",
    numeric: false,
    label: "Dates Start  Dates End",
    sortingBy: "dateStart",
  },
  {
    id: "aptSalary",
    numeric: false,
    label: "Apt % / \n Salary",
    sortingBy: "apt",
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

const PersonEmploymentTable = () => {
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

export default React.memo(PersonEmploymentTable);
