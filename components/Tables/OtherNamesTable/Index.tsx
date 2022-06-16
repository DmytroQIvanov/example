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
    nameSourceType: "Departament Directory",
    nameSourceSubType: "W298167",
    firstName: "Christopfer",
    middleNames: "Kennetch",
    lastName: "Sugasree",
    nickName: "May",
    suffix: "smth",
    dfkv: "01/01/2021",
    dlkv: "01/01/2022",
    dmi: "01/01/2022",
  },
  {
    id: "2",
    nameSourceType: "sDepartament Directory",
    nameSourceSubType: "4W298167",
    firstName: "Christop5425fer",
    middleNames: "Kennetch47",
    lastName: "Sugasreedad",
    nickName: "ssss",
    suffix: "smth555",
    dfkv: "01/01/2041",
    dlkv: "01/01/2012",
    dmi: "01/01/2022",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "nameSource",
    label: "Name Source",
  },
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "middleNames",
    label: "Middle Names",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "nickName",
    label: "Nick Name",
    secondLabel: "Suffix",
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
    React.useState<keyof IRowsPersonEmploymentTable>("dmi");

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
