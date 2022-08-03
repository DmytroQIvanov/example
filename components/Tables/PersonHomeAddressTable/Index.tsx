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
import AddressEditModal from "./AddressEditModal";
import { LinearProgress } from "@mui/material";
import { useMutation } from "@apollo/client";
import {
  DELETE_PERSON_HOME_TABLE,
  HOME_ADDRESS_TABLE,
  INVALIDATE_PERSON_HOME_ADDRESS,
} from "../../../schemas/HomeAddressSchemas";
import { useRouter } from "next/router";
import UseTableValues from "../../../hooks/UseTableValues";
import {
  CHANGE_OTHER_NAME,
  CREATE_OTHER_NAME,
  DELETE_OTHER_NAMES,
  GET_OTHER_NAMES,
} from "../../../schemas/OtherNamesSchemas";

`accuracy: "ROOFTOP"
apartment: null
city: ""
coments: null
country: "United Kingdom"
date_first_known_valid: "2022-07-12T10:17:22.909387"
date_last_known_valid: "2022-07-12T10:17:22.909387"
date_marked_invalid: null
information_source_type: {__typename: 'information_source_type', information_source_type_id: 1, information_source_type: 'Lorem'}
person_home_address_id: 1
state: null
street_name: "Sloane Square"
street_number: ""
__typename: "person_home_address"`;

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "homeAddress",
    label: "Home Address",
    sortingBy: "street_number",
  },
  {
    id: "locationAccuracy",
    label: "Location Accuracy",
    sortingBy: "location_accuracy",
  },

  {
    id: "source",
    label: "Source",
    sortingBy: "information_source_type.informationsourcetype",
  },
  {
    id: "comments",
    label: "Comments",
  },

  {
    id: "dfkv",
    label: "DFKV",
    sortingBy: "date_first_known_valid",
  },
  {
    id: "dlkv",
    label: "DLKV",
    sortingBy: "date_last_known_valid",
  },
  {
    id: "marketInvalid",
    label: "Market Invalid",
    sortingBy: "date_marked_invalid",
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
      tableName: "person_home_address",
      idName: "person_home_address_id",
    },
    schemas: {
      // changeSchema: CHANGE_OTHER_NAME,
      // createSchema: CREATE_OTHER_NAME,
      // deleteSchema: DELETE_PERSON_HOME_TABLE,
      querySchema: HOME_ADDRESS_TABLE,
    },
  });

  const [stateModal, setStateModal] = useState(false);
  const onHandleClose = () => {
    setStateModal(false);
  };
  const onHandleOpen = () => {
    setStateModal(true);
  };

  const onDelete = (state: any) => {
    deleteFunction({
      variables: { id: state.person_home_address_id },
    });
  };
  return (
    <>
      <TableWrapper
        rows={tableElements}
        // onSaveFunction={onCreateFunction}
        // onChangeFunction={onChangeFunction}
        deleteFunction={onDelete}
        refetch={refetch}
        errorMessage={errorMessage}
        headCells={headCells}
        TableRowComponent={TableRowComponent}
        buttonsList={[
          {
            label: "Add",
            buttonFunction: onHandleOpen,
            disabled: !router.query.id,
          },
        ]}
        disableAddBtn
        addressEditModal={({ onSaveWithProvidedState }) => (
          <AddressEditModal
            open={stateModal}
            handleClose={onHandleClose}
            onChangeAddress={onSaveWithProvidedState}
            refetch={refetch}
            title={"Adding home address"}
            rowState={"add"}
          />
        )}
      />
    </>
  );
};

export default React.memo(Index);
