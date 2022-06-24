import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineRight,
} from "react-icons/ai";
import { EnhancedTableHead } from "../../../ShowSimilar/Table";
interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

type Order = "asc" | "desc";
interface Data {
  id: number;
  personType: string;
  unitType: string;
  firstName: string;
  lastName: string;
  principle: string;
  area: string;
  location: string;
  phones: string;
  department: string;
  pI: string;
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
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
  array: any,
  comparator: (a: T, b: T) => number
): ItemType[] {
  const stabilizedThis = array.map(
    (el: any, index: number) => [el, index] as [T, number]
  );
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}

interface ItemType {
  id: number;
  personType: string;
  unitType: string;
  firstName: string;
  mt: string;
  lastName: string;
  nickName: string;
  location: string;
  lastOrganized: string;
  other: string;
}

const rows: ItemType[] = [
  {
    id: 1,
    personType: "GR",
    unitType: "BX",
    firstName: "Alberto",
    mt: "A",
    lastName: "Agulia1",
    nickName: "AI1",
    location: "LA, BR",
    lastOrganized: "03/02/2021",
    other: "Football1",
  },
  {
    id: 2,
    personType: "GR",
    unitType: "AD",
    firstName: "Albe1",
    mt: "B",
    lastName: "Agulia2",
    nickName: "AI2",
    location: "LA, BR",
    lastOrganized: "03/02/2021",
    other: "Football2",
  },
  {
    id: 3,
    personType: "GR",
    unitType: "BX",
    firstName: "Albe2",
    mt: "AB",
    lastName: "Agulia3",
    nickName: "AI3",
    location: "LA, BR",
    lastOrganized: "03/02/2021",
    other: "Football3",
  },
  {
    id: 4,
    personType: "GR",
    unitType: "AD",
    firstName: "Albe3",
    mt: "C",
    lastName: "Agulia4",
    nickName: "AI4",
    location: "LA, BR",
    lastOrganized: "03/02/2021",
    other: "Football4",
  },
  {
    id: 5,
    personType: "",
    unitType: "BX",
    firstName: "Albe4",
    mt: "A",
    lastName: "Agulia5",
    nickName: "AI5",
    location: "LA, BR",
    lastOrganized: "03/02/2021",
    other: "Football5",
  },
  {
    id: 6,
    personType: "",
    unitType: "BX",
    firstName: "Albe5",
    mt: "B",
    lastName: "Agulia6",
    nickName: "AI6",
    location: "LA, BR",
    lastOrganized: "03/02/2021",
    other: "Football6",
  },
  {
    id: 7,
    personType: "",
    unitType: "BX",
    firstName: "Albe6",
    mt: "C",
    lastName: "Agulia7",
    nickName: "AI7",
    location: "LA, BR",
    lastOrganized: "03/02/2021",
    other: "Football7",
  },
];
// const headCells: readonly HeadCell[] = [
const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    label: "Person ID",
  },
  {
    id: "personType",
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
    id: "location",
    numeric: false,
    label: "Location",
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
];

function ModalTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");

  const handleRequestSort = (_: any, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [items, setItems] = useState<Array<ItemType>>([]);

  const addItem = (newItem: ItemType) => {
    const filteredItems = items.filter((item) => item.id !== newItem.id);
    filteredItems.push(newItem);
    setItems(filteredItems);
  };

  const removeItem = (newItem: ItemType) => {
    const filteredItems = items.filter((item) => item.id !== newItem.id);
    setItems(filteredItems);
  };

  return (
    <div className="mt-9 flex h-full w-full flex-col gap-5">
      <div>
        {items.map((item) => (
          <div
            key={item.id}
            className="m-1 inline-block rounded-full bg-blue-700 py-1 pl-4 pr-2 text-white"
          >
            <div className="flex h-full w-full flex-row items-center justify-center gap-1 hover:cursor-pointer">
              <div className="mr-1">{item.firstName}</div>
              <AiFillCloseCircle
                onClick={() => removeItem(item)}
                className="h-6 w-6 text-blue-100 hover:cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
      <TableContainer className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500">
        <Table>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>

                <TableCell className="hidden sm:table-cell">
                  {row.unitType}
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.lastName}
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  {row.personType}
                </TableCell>
                <TableCell className="hidden md:table-cell">{row.mt}</TableCell>

                <TableCell className="hidden md:table-cell">
                  {row.nickName}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.location}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {row.lastOrganized}
                </TableCell>
                <TableCell padding="checkbox">
                  <div className="flex flex-row items-center justify-center gap-3">
                    {!items.filter((item) => item.id === row.id).length ? (
                      <AiOutlinePlus
                        onClick={() => addItem(row)}
                        className="font-bold text-green-600 hover:cursor-pointer hover:text-green-700"
                      />
                    ) : (
                      <AiOutlineClose
                        onClick={() => removeItem(row)}
                        className="font-bold text-red-600 hover:cursor-pointer hover:text-red-700"
                      />
                    )}
                    <AiOutlineRight className="text-blue-700 hover:cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default React.memo(ModalTable);
