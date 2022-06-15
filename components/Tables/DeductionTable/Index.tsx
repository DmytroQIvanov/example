import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    date: "01/01/2021",
    type: "Dues",
    wages: "$1,231",
    hours: "55",
    deductions: "184",
    "%": "5,00",
    jobCode: "34515",
    report: "Employee List",
    transactions: "Cancellation",
    campus: "Borkaley",
  },
  {
    id: "2",
    date: "04/11/2011",
    type: "Sues",
    wages: "$42,231",
    hours: "13",
    deductions: "182",
    "%": "2,01",
    jobCode: "34115",
    report: "Employee List",
    transactions: "Successing",
    campus: "Lurkaley",
  },
  {
    id: "3",
    date: "11/01/2011",
    type: "Dues",
    wages: "$3,231",
    hours: "5",
    deductions: "144",
    "%": "5,20",
    jobCode: "15515",
    report: "Employee List",
    transactions: "Cancellation",
    campus: "Dunkey",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "date",
    label: "Date",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "wages",
    label: "Wages",
  },
  {
    id: "hours",
    label: "Hours",
  },
  {
    id: "deductions",
    label: "Deductions",
  },
  {
    id: "%",
    label: "%",
  },
  {
    id: "jobCode",
    label: "Job Code",
  },
  {
    id: "report",
    label: "Report",
  },

  {
    id: "transactions",
    label: "Transactions",
  },

  {
    id: "report",
    label: "Report",
  },
  {
    id: "options",
    label: "Options",
  },
];

const DeductionTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IRowsPersonEmploymentTable>("campus");

  const handleRequestSort = (
    _: any,
    property: keyof IRowsPersonEmploymentTable
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
        activeRowObject,
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

export default React.memo(AffiliationTable);
