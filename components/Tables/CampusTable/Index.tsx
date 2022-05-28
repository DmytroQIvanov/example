import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Box, Button } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";

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

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    campus: "Los Angeles",
    area: "Phyiscs",
    superArea: "2810 Cohort",
    turf: "Josh Kenshall",
    suppress: true,
    pi: true,
    informationSource: "smth",
    comments:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    dfkv: "01/02/2021",
    dlkv: "string1",
    dmi: "02/03/2013",
  },
];

interface HeadCell {
  id: keyof IColumnsPersonEmploymentTable;
  label: string;
  numeric: boolean;
  secondLabel?: string;
  width?: string;
}
const headCells: readonly HeadCell[] = [
  {
    id: "campus",
    numeric: true,
    label: "Campus",
  },
  {
    id: "superAreaArea",
    numeric: false,
    label: "Super Area",
    secondLabel: "Area",
  },
  {
    id: "turf",
    numeric: false,
    label: "Turf",
  },
  {
    id: "informationSource",
    numeric: false,
    label: "Information Source",
  },
  {
    id: "suppress",
    numeric: false,
    label: "Suppress",
  },

  {
    id: "pi",
    numeric: false,
    label: "PI",
  },

  {
    id: "comments",
    numeric: false,
    label: "Comments",
  },
  {
    id: "dfkv",
    numeric: false,
    label: "DFKV",
  },
  {
    id: "dlvk",
    numeric: false,
    label: "DLVK",
  },
  {
    id: "dmi",
    numeric: false,
    label: "DMI",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IRowsPersonEmploymentTable
  ) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeadCell[];
}
export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof IRowsPersonEmploymentTable) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.label}
            className="whitespace-nowrap"
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width && headCell.width}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                flexDirection: "column",
                alignContent: "flex-start",
                ml: "0px",
              }}
            >
              <Box>
                {headCell.label}
                {headCell.secondLabel && (
                  <>
                    <br /> {headCell.secondLabel}
                  </>
                )}
              </Box>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const CampusTable = () => {
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
  const [tableElements, setTableElements] = useState(rows);
  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
  };

  return (
    <div>
      <Box sx={{ display: "flex", mt: "10px", mb: "10px" }}>
        <Button
          sx={{ m: "auto 20px auto auto" }}
          color={"success"}
          variant={"contained"}
        >
          Add
        </Button>
      </Box>
      <div style={{ overflow: "auto", width: "100%" }}>
        <TableContainer component={Paper} style={{ width: "max-content" }}>
          <Table aria-label="customized table">
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
                  />
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default React.memo(CampusTable);
