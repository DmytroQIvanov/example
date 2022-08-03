import React, { useState } from "react";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import {
  CHANGE_OTHER_NAME,
  CREATE_OTHER_NAME,
  DELETE_OTHER_NAMES,
  GET_OTHER_NAMES,
} from "../../../schemas/OtherNamesSchemas";
import { useRouter } from "next/router";
import UseTableValues from "../../../hooks/UseTableValues";

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "nameSource",
    label: "Name Source",
    sortingBy: "nameSourceType",
  },
  {
    id: "first_name",
    label: "First Name",
  },
  {
    id: "middle_name",
    label: "Middle Names",
  },
  {
    id: "last_name",
    label: "Last Name",
  },
  {
    id: "nick_name",
    label: "Nick Name",
    secondLabel: "Suffix",
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

const Index: React.FC = () => {
  const router = useRouter();
  const {
    tableElements,
    refetch,
    functions: { createFunction, deleteFunction, changeFunction },
    alert: { setSuccessAlert, successAlert },
    error: { setErrorMessage, errorMessage },
  } = UseTableValues({
    tableNames: {
      tableName: "person_other_name",
      idName: "person_other_name_id",
    },
    schemas: {
      changeSchema: CHANGE_OTHER_NAME,
      createSchema: CREATE_OTHER_NAME,
      deleteSchema: DELETE_OTHER_NAMES,
      querySchema: GET_OTHER_NAMES,
    },
  });

  const onChangeFunction = (state: any) => {
    const date = new Date();
    changeFunction({
      variables: {
        id: state.person_other_name_id,
        date: date,
        namesource: state.name_source_type.name_source_type_id,
        namesourcesubtype: state.name_source_subtype.name_source_type_id,
        first_name: state.first_name,
        middle_name: state.middle_name,
        last_name: state.last_name,
        nick_name: state.nick_name,
        suffix: state.suffix,
      },
    });
  };

  const onCreateFunction = (state: any) => {
    const date = new Date();
    createFunction({
      variables: {
        pid: router.query.id,
        id: state.person_other_name_id,
        date: date,
        namesource: state.name_source_type.name_source_type_id,
        namesourcesubtype: state.name_source_subtype.name_source_type_id,
        first_name: state.first_name,
        middle_name: state.middle_name,
        last_name: state.last_name,
        nick_name: state.nick_name,
        suffix: state.suffix,
      },
    });
  };

  const onDeleteFunction = (state: any) => {
    deleteFunction({ variables: { id: state.person_other_name_id } });
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
