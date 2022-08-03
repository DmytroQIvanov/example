import React from "react";

import { IColumnsPersonEmploymentTable } from "./interfaces";
import TableRowComponent from "./TableRow";
import TableWrapper from "../TablesComponents/TableWrapper/Index";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { useRouter } from "next/router";
import {
  DELETE_PERSON_PHONE,
  INSERT_PERSON_PHONE,
  PERSON_PHONE_DATA,
  UPDATE_PERSON_PHONE,
} from "../../../schemas/PhonesSchemas";
import UseTableValues from "../../../hooks/UseTableValues";

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "phoneNumber",
    label: "Phone Number",
    sortingBy: "phone_number",
  },
  {
    id: "phonyType",
    label: "Phone Type",
    sortingBy: "phone_type.phone_type_id",
  },
  {
    id: "infoSource",
    label: "Info Source",
    sortingBy: "information_source_type.information_source_type_id",
  },
  {
    id: "doNotCallDate",
    label: "Do Not Call Date",
    sortingBy: "date_marked_do_not_call",
  },
  {
    id: "comments",
    label: "Comments",
    width: "400px",
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
const PhoneTable = () => {
  const {
    tableElements,
    refetch,
    functions: { createFunction, deleteFunction, changeFunction },
    alert: { setSuccessAlert, successAlert },
    error: { setErrorMessage, errorMessage },
  } = UseTableValues({
    tableNames: { tableName: "person_phone", idName: "person_phone_id" },
    schemas: {
      changeSchema: UPDATE_PERSON_PHONE,
      createSchema: INSERT_PERSON_PHONE,
      deleteSchema: DELETE_PERSON_PHONE,
      querySchema: PERSON_PHONE_DATA,
    },
  });
  const onChangeFunction = (state: any) => {
    changeFunction({
      variables: {
        number: state.phone_number,
        type: state.phone_type.phone_type_id,
        source: state.information_source_type.information_source_type_id,
        dnc: state.date_marked_do_not_call,
        comments: state.comments,
        id: state.person_phone_id,
      },
    });
  };

  const router = useRouter();
  const onCreateFunction = (state: any) => {
    createFunction({
      variables: {
        number: state.phone_number,
        type: state.phone_type.phone_type_id,
        source: state.information_source_type.information_source_type_id,
        comments: state.comments,
        dnc: state.dncBoolean ? state.date_marked_do_not_call : null,

        pid: router.query.id,
      },
    });
  };

  const onDeleteFunction = (state: any) => {
    if (!state.person_phone_id) return;
    deleteFunction({
      variables: { id: state.person_phone_id },
    });
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

export default React.memo(PhoneTable);
