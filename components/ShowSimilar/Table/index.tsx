import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";

interface Data {
  id: number;
  type: string;
  firstName: string;
  lastName: string;
  principle: string;
  area: string;
  locations: string;
  phones: string;
  department: string;
  pI: string;
  card: string;
  activeUnit: string;
  left: string;
  city: string;
}

function createData(
  id: number,
  type: string,
  firstName: string,
  lastName: string,
  principle: string,
  area: string,
  locations: string,
  phones: string,
  department: string,
  pI: string,
  card: string,
  activeUnit: string,
  left: string,
  city: string
): Data {
  return {
    id,
    type,
    firstName,
    lastName,
    principle,
    area,
    locations,
    phones,
    department,
    pI,
    card,
    activeUnit,
    left,
    city,
  };
}

const rows: Data[] = [
  createData(
    1,
    "aasdfa",
    "aqwea",
    "aqea",
    "awea",
    "asda",
    "aacs",
    "sdfaa",
    "aasdf",
    "adqa",
    "aasd",
    "aaada",
    "fddaa",
    "atrtya"
  ),
  createData(
    2,
    "artya",
    "adfga",
    "arta",
    "agfgha",
    "artya",
    "artya",
    "atyua",
    "tyuaa",
    "tiaa",
    "atyuia",
    "tyuaa",
    "ayua",
    "ayta"
  ),
  createData(
    3,
    "aa",
    "ara",
    "artya",
    "artya",
    "artyua",
    "artya",
    "rtyaa",
    "artya",
    "artyua",
    "rtyuaa",
    "artyua",
    "artyua",
    "artyua"
  ),
  createData(
    4,
    "artyua",
    "artya",
    "artya",
    "artyua",
    "artyua",
    "artya",
    "artya",
    "rtyuaa",
    "rtyaa",
    "artyua",
    "artya",
    "artya",
    "atya"
  ),
  createData(
    5,
    "awera",
    "adfga",
    "asdfa",
    "asdfga",
    "asdfga",
    "asra",
    "awerta",
    "awerta",
    "awqa",
    "aawer",
    "aader",
    "aaxdf",
    "asa"
  ),
  createData(
    6,
    "asdfa",
    "awta",
    "awerta",
    "awerta",
    "awerta",
    "awera",
    "aaaa",
    "adfa",
    "aoyiua",
    "ayuia",
    "ahka",
    "hhaa",
    "aakl"
  ),
  createData(
    7,
    "ara",
    "aerta",
    "aerta",
    "asa",
    "aqea",
    "aqea",
    "aqwera",
    "aqwera",
    "aqwera",
    "aqwera",
    "aasdfa",
    "aasdfa",
    "aasdfa"
  ),
  createData(
    8,
    "aasdaadf",
    "aasdfa",
    "aasdfa",
    "azxa",
    "aera",
    "aqwea",
    "aqwera",
    "aawea",
    "awera",
    "asdaa",
    "aasda",
    "aqwera",
    "qwera"
  ),
  createData(
    9,
    "asdaa",
    "werasaa",
    "awera",
    "ayua",
    "rta",
    "ada",
    "dfgaa",
    "dertaa",
    "ertaa",
    "ertaa",
    "rtyaa",
    "rtawa",
    "uyiaa"
  ),
  createData(
    10,
    "rtyaa",
    "ytiaa",
    "gjaa",
    "oiypaa",
    "ertaa",
    "qerwaa",
    "hjaa",
    "asdaa",
    "ertaa",
    "sdfaa",
    "ryuaa",
    "ghjaa",
    "yjaa"
  ),
  createData(
    11,
    "qweaa",
    "weraa",
    "sdfaa",
    "wraa",
    "ertaa",
    "qeraa",
    "sdaa",
    "wertaa",
    "ghdaa",
    "rtaa",
    "eraa",
    "sdfaa",
    "tyaa"
  ),
  createData(
    12,
    "ghetaa",
    "dfgaa",
    "ertaa",
    "faa",
    "cdfaa",
    "ertaa",
    "dfgaa",
    "eraa",
    "uyraa",
    "fgaa",
    "jfaa",
    "mghaa",
    "rtyaa"
  ),
  createData(
    13,
    "yuiaa",
    "tyaa",
    "tyaa",
    "eryaa",
    "weraa",
    "weaa",
    "weaa",
    "weaa",
    "fgaa",
    "gdfaa",
    "fgaa",
    "dfgaa",
    "rtraa"
  ),
  createData(
    14,
    "yuiaa",
    "rtyaa",
    "etaa",
    "tyaa",
    "rtaa",
    "iyaa",
    "tyaa",
    "tyaa",
    "ghjaa",
    "bgaa",
    "yuaa",
    "qweaa",
    "eraa"
  ),
  createData(
    15,
    "tyreaa",
    "dfgaa",
    "ghaa",
    "dfgaa",
    "reaa",
    "sdfaa",
    "vdfaa",
    "greraa",
    "yraa",
    "eraa",
    "dfaa",
    "hfdaa",
    "eraa"
  ),
  createData(
    16,
    "qweaa",
    "aqwa",
    "aqa",
    "asda",
    "aeqra",
    "qaa",
    "sdaa",
    "eraera",
    "arta",
    "qawea",
    "aqa",
    "qweaqwa",
    "traa"
  ),
  createData(
    17,
    "fghaa",
    "rtaa",
    "rtaa",
    "utaa",
    "eraa",
    "wraa",
    "utaa",
    "eeraa",
    "iyaa",
    "ryaa",
    "mghaa",
    "hyaa",
    "rtyaa"
  ),
  createData(
    18,
    "nhnaa",
    "rtaa",
    "fgaa",
    "bfaa",
    "gfgaa",
    "teaa",
    "eraa",
    "ghaa",
    "yjaa",
    "teraa",
    "ertaa",
    "eraa",
    "oytaa"
  ),
];

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

export interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    label: "Person ID",
  },
  {
    id: "type",
    numeric: false,
    label: "Type",
  },
  {
    id: "firstName",
    numeric: false,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: false,
    label: "Last Name",
  },
  {
    id: "principle",
    numeric: false,
    label: "Principle",
  },
  {
    id: "area",
    numeric: false,
    label: "Area",
  },
  {
    id: "locations",
    numeric: false,
    label: "Locations",
  },
  {
    id: "phones",
    numeric: false,
    label: "Phones",
  },
  {
    id: "department",
    numeric: false,
    label: "Department",
  },
  {
    id: "pI",
    numeric: false,
    label: "PI",
  },
  {
    id: "card",
    numeric: false,
    label: "Card",
  },
  {
    id: "activeUnit",
    numeric: false,
    label: "Active Unit",
  },
  {
    id: "left",
    numeric: false,
    label: "Left",
  },
  {
    id: "city",
    numeric: false,
    label: "City",
  },
];

interface EnhancedTableProps {
  onRequestSort?: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[];
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      if (onRequestSort) {
        onRequestSort(event, property);
      }
    };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.label}
            className="whitespace-nowrap"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
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

function ShowSimilarTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");

  const handleRequestSort = (_: any, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} className="max-h-40rem w-full max-w-full">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
        />
        <TableBody>
          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
          {stableSort(rows, getComparator(order, orderBy)).map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell
                  className="whitespace-nowrap"
                  component="th"
                  scope="row"
                >
                  {row.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">{row.type}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.firstName}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.lastName}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.principle}
                </TableCell>
                <TableCell className="whitespace-nowrap">{row.area}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.locations}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.phones}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.department}
                </TableCell>
                <TableCell className="whitespace-nowrap">{row.pI}</TableCell>
                <TableCell className="whitespace-nowrap">{row.card}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {row.activeUnit}
                </TableCell>
                <TableCell className="whitespace-nowrap">{row.left}</TableCell>
                <TableCell className="whitespace-nowrap">{row.city}</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={6} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(ShowSimilarTable);
