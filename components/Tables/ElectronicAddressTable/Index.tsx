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
    electronicAddress: "msalvador@school.edu",
    electronicType: "Un1iversity Email",
    source: "U.List",
    emailOptions: true,
    dfkv: "01/01/2021",
    dlkv: "01/01/2022",
    dmi: "01/01/2022",
  },
  {
    id: "2",
    electronicAddress: "m2salvador@sssssschool.edu",
    electronicType: "Un5iversity Email",
    source: "U.List",
    emailOptions: true,
    dfkv: "01/11/2021",
    dlkv: "01/01/2022",
    dmi: "01/01/2022",
  },
  {
    id: "3",
    electronicAddress: "ms4alvador@school.edu",
    electronicType: "Un3iversity Email",
    source: "U.List",
    emailOptions: true,
    dfkv: "01/31/2021",
    dlkv: "01/01/2022",
    dmi: "01/01/2022",
  },
  {
    id: "4",
    electronicAddress: "ms32alvador@school.edu",
    electronicType: "Un3iversity Email",
    source: "U.List",
    emailOptions: true,
    dfkv: "01/51/2021",
    dlkv: "01/01/2022",
    dmi: "01/01/2022",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "electronicAddress",
    label: "Electronic Address",
  },
  {
    id: "electronicType",
    label: "Electronic Type",
  },
  {
    id: "source",
    label: "Source",
  },
  {
    id: "emailOptions",
    label: "Email Options",
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
    React.useState<keyof IRowsPersonEmploymentTable>("electronicAddress");

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
    <TableWrapper rows={rows}>
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
