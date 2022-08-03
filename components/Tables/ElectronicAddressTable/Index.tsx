import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PERSON_ELECTRONIC,
  INSERT_PERSON_ELECTRONIC,
  PERSON_ELECTRONIC_DATA,
  UPDATE_PERSON_ELECTRONIC,
} from "../../../schemas/PersonElectronicSchema";
import UseTableValues from "../../../hooks/UseTableValues";
import {
  DELETE_CAMPUS_TABLE,
  INSERT_PERSON_CAMPUS,
  PERSON_CAMPUS_QUERY,
  UPDATE_PERSON_CAMPUS,
} from "../../../schemas/CampusSchemas";

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "electronic_address",
    label: "Electronic Address",
  },
  {
    id: "electronic_type",
    label: "Electronic Type",
    sortingBy: "electronic_type.electronic_type_id",
  },
  {
    id: "information_source_type",
    label: "Source",
    sortingBy: "electronic_type.electronic_type_id",
  },
  {
    id: "emailOptions",
    label: "Email Options",
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

const Index = () => {
  const router = useRouter();
  const {
    tableElements,
    refetch,
    functions: { createFunction, deleteFunction, changeFunction },
    alert: { setSuccessAlert, successAlert },
    error: { setErrorMessage, errorMessage },
  } = UseTableValues({
    tableNames: {
      tableName: "person_electronic",
      idName: "person_electronic_id",
    },
    schemas: {
      changeSchema: UPDATE_PERSON_ELECTRONIC,
      createSchema: INSERT_PERSON_ELECTRONIC,
      deleteSchema: DELETE_PERSON_ELECTRONIC,
      querySchema: PERSON_ELECTRONIC_DATA,
    },
  });

  const onChangeFunction = (state: any) => {
    const date = new Date();

    changeFunction({
      variables: {
        email: state.electronic_address,
        source: state.information_source_type.information_source_type_id,
        electronictype: state.electronic_type.electronic_type_id,

        id: state.person_electronic_id,
      },
    });
  };
  const onCreateFunction = (state: any) => {
    const date = new Date();

    createFunction({
      variables: {
        email: state.electronic_address,
        source: state.information_source_type.information_source_type_id,
        electronictype: state.electronic_type.electronic_type_id,
        pid: router.query.id,
      },
    });
  };

  const onDeleteFunction = (state: any) => {
    if (!state.person_electronic_id) return;
    deleteFunction({ variables: { id: state.person_electronic_id } });
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

export default React.memo(Index);
