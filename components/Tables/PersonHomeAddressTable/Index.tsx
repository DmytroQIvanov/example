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

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "homeAddress",
    label: "Home Address",
    sortingBy: "streetnumber",
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
    sortingBy: "datefirstknownvalid",
  },
  {
    id: "dlkv",
    label: "DLKV",
    sortingBy: "datelastknownvalid",
  },
  {
    id: "marketInvalid",
    label: "Market Invalid",
    sortingBy: "datemarkedinvalid",
  },
  {
    id: "options",
    label: "Options",
  },
];

const Index: React.FC<{ tableData: IRowsPersonEmploymentTable[] }> = ({
  tableData,
}) => {
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
          />
          <TableBody>
            {/*@ts-ignore*/}
            {stableSort(tableElements, getComparator(order, orderBy)).map(
              (row: IRowsPersonEmploymentTable) => (
                <TableRowComponent
                  row={row}
                  key={`${row.id}`}
                  onChangeWithProvidedState={onChangeWithProvidedState}
                  onSaveWithProvidedState={onSaveWithProvidedState}
                  onDelete={onDelete}
                  onAddSave={onAddSave}
                  onAddCancel={onAddCancel}
                  activeRowObject={activeRowObject}
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
