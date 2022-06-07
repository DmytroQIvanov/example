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
import AddressEditModal from "../../Table/RowCells/AddressEditModal";

// const rows: IRowsPersonEmploymentTable[] = [
//   {
//     id: "1",
//
//     street_number: "33",
//     street: "Smaf",
//     full: "",
//     city: "Izmail",
//     state: "Example",
//     country: "Example2",
//     source: "Example3",
//     comments: "Example Example",
//     postal: "",
//     apt: "smth",
//     dlkv: "smth",
//     marketInvalid: "smth",
//   },
// ];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "homeAddress",
    label: "Home Address",
  },
  {
    id: "locationAccuracy",
    label: "Location Accuracy",
  },

  {
    id: "source",
    label: "Source",
  },
  {
    id: "comments",
    label: "Comments",
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
    id: "marketInvalid",
    label: "Market Invalid",
  },
  {
    id: "options",
    label: "Options",
  },
];

const Index:React.FC<{tableData:IRowsPersonEmploymentTable[]}> = ({tableData}) => {

  console.log(tableData,'tableData')
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IRowsPersonEmploymentTable>("options");

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
  return (
    <TableWrapper
      buttonsList={[{ label: "Add", buttonFunction: onHandleOpen }]}
      rows={tableData}
      disableAddBtn
    >
      {({
        EnhancedTableHead,
        stableSort,
        getComparator,
        tableElements,
        onDelete,
        onCancel,
        onSave,
        onSaveWithProvidedState,
      }) => (
        <>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {/*@ts-ignore*/}
            {stableSort(tableElements, getComparator(order, orderBy)).map(
              (row: IRowsPersonEmploymentTable) => (
                <TableRowComponent
                  row={row}
                  key={`${row?.id} `}
                  onDelete={onDelete}
                  onAddSave={onSave}
                  onAddCancel={onCancel}
                  onSaveWithProvidedState={onSaveWithProvidedState}
                />
              )
            )}
            <AddressEditModal
              open={stateModal}
              handleClose={onHandleClose}
              onChangeAddress={onSaveWithProvidedState}
            />
          </TableBody>
        </>
      )}
    </TableWrapper>
  );
};

export default React.memo(Index);
