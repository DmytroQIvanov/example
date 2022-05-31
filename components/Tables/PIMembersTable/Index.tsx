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

    personId: "1Smth",
    personType: "Smth",
    firstName: "Smth",
    superArea: "Smth",
    locations: "Smth",
    phones: "Smth",
    department: "Smth",
    pi: "Smth",
    area: "SMTH",
    card: "Smth",
    activeUnit: "Smth",
    leftUC: "Smth",
    campus: "Smth",
  },
  {
    id: "2",
    personId: "Smth2",
    personType: "Smth",
    firstName: "Smth",
    lastName: "SMTH",
    area: "SMTH",
    superArea: "Smth",
    locations: "Smth",
    phones: "Smth",
    department: "Smth",
    pi: "Smth",
    card: "Smth",
    activeUnit: "Smth",
    leftUC: "Smth",
    campus: "Smth",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "personId",
    label: "Person Id",
  },
  {
    id: "personType",
    label: "Person Type",
  },
  {
    id: "firstName",
    label: "First Name",
  },

  {
    id: "lastName",
    label: "lastName",
  },

  {
    id: "superArea",
    label: "Super Area",
  },

  {
    id: "area",
    label: "Area",
  },

  {
    id: "locations",
    label: "Locations",
  },

  {
    id: "phones",
    label: "Phones",
  },
  {
    id: "department",
    label: "Department",
  },
  {
    id: "pi",
    label: "PI",
  },
  {
    id: "card",
    label: "Card",
  },

  {
    id: "activeUnit",
    label: "Active",
    secondLabel: "Unit",
  },

  {
    id: "leftUC",
    label: "Left UC",
  },
  {
    id: "campus",
    label: "Campus",
  },
];

const Index = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IRowsPersonEmploymentTable>("personId");

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
        onDelete,
        onCancel,
        onSave,
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
                  onDelete={onDelete}
                  onAddSave={onSave}
                  onAddCancel={onCancel}
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
