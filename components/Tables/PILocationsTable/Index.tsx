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

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    campus: "string",
    location1: "string",
    location2: "string",
    informationSource: "string",
    propagate: "string",
    comments: "string",
    dfkv: "01/02/2003",
    dlkv: "01/02/2005",
    dmi: "01/02/2001",
  },
  {
    id: "2",
    campus: "campus",
    location1: "location1",
    location2: "location2",
    informationSource: "informationSource",
    propagate: "propagate",
    comments: "comments",
    dfkv: "01/02/2002",
    dlkv: "01/02/2002",
    dmi: "01/02/2002",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "campus",
    label: "Campus",
  },
  {
    id: "location",
    label: "Location",
    sortingBy: "location1",
  },
  {
    id: "informationSource",
    label: "Information Source",
  },

  {
    id: "propagate",
    label: "Propagate",
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
    id: "dmi",
    label: "DMI",
  },

  {
    id: "options",
    label: "Options",
  },
];

const Index = () => {
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
  const [tableElements, setTableElements] = useState(rows);
  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
  };
  return (
    <TableWrapper rows={rows} buttonsList={[{ label: "Location Data Entry" }]}>
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
          </TableBody>
        </>
      )}
    </TableWrapper>
  );
};

export default React.memo(Index);
