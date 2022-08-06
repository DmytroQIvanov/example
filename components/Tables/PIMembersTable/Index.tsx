import React from "react";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
  // @ts-ignore
} from "./interfaces";

// @ts-ignore
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { useRouter } from "next/router";

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",

    personId: "1Smth",
    personType: "Smth",
    firstName: "Smth",
    superArea: "Smth",
    locations: "Smth",
    phones: "Smth",
    department: "Smth",
    pi: "Smth",
    area: "SMTH",
    card: "Smth",
    activeUnit: "Smth",
    lastName: "SMTH",
    leftUC: "Smth",
    campus: "Smth",
  },
  {
    id: "2",
    personId: "Smth2",
    personType: "Smth1",
    firstName: "Smth3",
    lastName: "SMTH4",
    area: "SMTH5",
    superArea: "asSmth",
    locations: "locations",
    phones: "0231-2313-44",
    department: "department",
    pi: "pi",
    card: "card",
    activeUnit: "activeUnit",
    leftUC: "leftUC",
    campus: "campus",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "personId",
    label: "Person Id",
  },
  {
    id: "personType",
    label: "Person Type",
  },
  {
    id: "firstName",
    label: "First Name",
  },

  {
    id: "lastName",
    label: "lastName",
  },

  {
    id: "superArea",
    label: "Super Area",
  },

  {
    id: "area",
    label: "Area",
  },

  {
    id: "locations",
    label: "Locations",
  },

  {
    id: "phones",
    label: "Phones",
  },
  {
    id: "department",
    label: "Department",
  },
  {
    id: "pi",
    label: "PI",
  },
  {
    id: "card",
    label: "Card",
  },

  {
    id: "activeUnit",
    label: "Active",
    secondLabel: "Unit",
  },

  {
    id: "leftUC",
    label: "Left UC",
  },
  {
    id: "campus",
    label: "Campus",
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
