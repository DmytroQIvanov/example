import React, { useEffect, useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_CAMPUS_TABLE,
  INSERT_PERSON_CAMPUS,
  PERSON_CAMPUS_QUERY,
  UPDATE_PERSON_CAMPUS,
} from "../../../schemas/CampusSchemas";
import UseTableValues from "../../../hooks/UseTableValues";
import {
  DELETE_PERSON_PHONE,
  INSERT_PERSON_PHONE,
  PERSON_PHONE_DATA,
  UPDATE_PERSON_PHONE,
} from "../../../schemas/PhonesSchemas";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// const rows: IRowsPersonEmploymentTable[] = [
//   {
//     id: "1",
//     campus: "Los Angeles",
//     area: "Phyiscs",
//     superArea: "2810 Cohort",
//     turf: "Josh Kenshall",
//     suppress: true,
//     pi: true,
//     informationSource: "smth",
//     comments:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     dfkv: "01/02/2021",
//     dlkv: "03/41/2333",
//     dmi: "02/03/2013",
//   },
//   {
//     id: "2",
//     campus: "San Andreas",
//     area: "Any",
//     superArea: "3410 Cohort",
//     turf: "Joshs",
//     suppress: false,
//     pi: false,
//     informationSource: "informationSource",
//     comments:
//       "do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     dfkv: "05/03/2021",
//     dlkv: "05/12/1344",
//     dmi: "02/03/2013",
//   },
// ];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "campus",
    label: "Campus",
    sortingBy: "campus.campus_name",
  },
  {
    id: "superAreaArea",
    label: "Super Area",
    secondLabel: "Area",
    sortingBy: "area.super_area.super_area",
  },
  {
    id: "turf",
    label: "Turf",
    sortingBy: "turfid",
  },
  {
    id: "informationSource",
    label: "Information Source",
    sortingBy: "information_source_type.information_source_type",
  },
  {
    id: "suppress",
    label: "Suppress",
  },
  {
    id: "pi",
    label: "PI",
    sortingBy: "is_pi",
  },

  {
    id: "comments",
    label: "Comments",
    sortingBy: "area.comments",
  },
  {
    id: "date_first_known_valid",
    label: "DFKV",
  },
  {
    id: "date_last_known_valid",
    label: "DLKV",
  },
  {
    id: "date_marked_invalid",
    label: "DMI",
  },

  {
    id: "options",
    label: "Options",
  },
];

const CampusTable = () => {
  const router = useRouter();
  const {
    tableElements,
    refetch,
    functions: { createFunction, deleteFunction, changeFunction },
    alert: { setSuccessAlert, successAlert },
    error: { setErrorMessage, errorMessage },
  } = UseTableValues({
    tableNames: { tableName: "person_campus", idName: "person_campus_id" },
    schemas: {
      changeSchema: UPDATE_PERSON_CAMPUS,
      createSchema: INSERT_PERSON_CAMPUS,
      deleteSchema: DELETE_CAMPUS_TABLE,
      querySchema: PERSON_CAMPUS_QUERY,
    },
  });

  const onChangeFunction = (state: any) => {
    const date = new Date();

    changeFunction({
      variables: {
        id: state.person_campus_id,
        date: date,
        campus: state.campus.campus_id || null,
        area: state.area.area_id || null,
        turf: state.turfid || null,
        source: state.information_source_type.information_source_type_id,
        supress: Boolean(state.supress),
        pi: Boolean(state.is_pi),
        summary: state.summary || null,
      },
    });
  };
  const onCreateFunction = (state: any) => {
    const date = new Date();
    createFunction({
      variables: {
        pid: router.query.id,
        date: date,
        campus: state.campus.campus_id || null,
        area: state.area.area_id || null,
        turf: state.turfid || null,
        source: state.information_source_type.information_source_type_id,
        supress: Boolean(state.supress),
        pi: Boolean(state.is_pi),
        summary: state.summary || null,
      },
    });
  };

  const onDeleteFunction = (state: any) => {
    if (!state.person_campus_id) return;
    deleteFunction({ variables: { id: state.person_campus_id } });
  };

  return (
    <TableWrapper
      rows={tableElements}
      onSaveFunction={onCreateFunction}
      onChangeFunction={onChangeFunction}
      deleteFunction={onDeleteFunction}
      refetch={refetch}
      errorMessage={errorMessage}
      headCells={headCells}
      TableRowComponent={TableRowComponent}
    />
  );
};

export default React.memo(CampusTable);
