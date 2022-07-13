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
  INVALIDATE_PERSON_HOME_ADDRESS,
} from "../../../shemas/HomeAddressShemas";
import { useRouter } from "next/router";

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

const Index: React.FC<{
  tableData: IRowsPersonEmploymentTable[];
  loading?: boolean;
  refetch?: Function;
}> = ({ tableData, loading, refetch }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IRowsPersonEmploymentTable>("options");

  const router = useRouter();
  const handleRequestSort = (
    _: any,
    property: keyof IRowsPersonEmploymentTable
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [stateModal, setStateModal] = useState(false);
  const onHandleClose = () => {
    setStateModal(false);
  };
  const onHandleOpen = () => {
    setStateModal(true);
  };

  const [deleteTableFunction, { loading: deletingLoading }] = useMutation(
    DELETE_PERSON_HOME_TABLE
  );
  return (
    <TableWrapper
      buttonsList={[
        {
          label: "Add",
          buttonFunction: onHandleOpen,
          disabled: !router.query.id,
        },
      ]}
      rows={tableData}
      disableAddBtn
      refetch={refetch}
      deleteFunction={deleteTableFunction}
    >
      {({
        EnhancedTableHead,
        stableSort,
        getComparator,
        tableElements,
        onSaveWithProvidedState,
        onChangeWithProvidedState,
        onAddSave,
        onAddCancel,
        activeRowObject,
        onDelete,
      }) => (
        <>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            loading={loading}
          />
          <TableBody style={{ minHeight: "200px", height: "200px" }}>
            {/*@ts-ignore*/}
            {stableSort(tableElements, getComparator(order, orderBy)).map(
              (row: IRowsPersonEmploymentTable) => (
                <TableRowComponent
                  row={row}
                  key={`${row?.person_home_address_id}`}
                  onChangeWithProvidedState={onChangeWithProvidedState}
                  onSaveWithProvidedState={onSaveWithProvidedState}
                  onDelete={onDelete}
                  onAddSave={onAddSave}
                  onAddCancel={onAddCancel}
                  activeRowObject={activeRowObject}
                  refetch={refetch}
                />
              )
            )}
            <AddressEditModal
              open={stateModal}
              handleClose={onHandleClose}
              onChangeAddress={onSaveWithProvidedState}
              refetch={refetch}
              title={"Adding home address"}
              rowState={"add"}
            />
          </TableBody>
        </>
      )}
    </TableWrapper>
  );
};

export default React.memo(Index);
