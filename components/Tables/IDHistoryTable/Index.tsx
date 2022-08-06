import React, { useState } from "react";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    campus: "Los Angeles",
    employeeID: "4147637",
    dfkv: "01/02/2021",
    dlkv: "04/12/2022",
    createdBy: "John",
  },
  {
    id: "2",
    campus: "San Andreas",
    employeeID: "41452111",
    dfkv: "01/04/2021",
    dlkv: "04/16/2022",
    createdBy: "Dima",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "campus",
    label: "Campus",
  },
  {
    id: "employeeID",
    label: "Employee ID",
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
    id: "createdBy",
    label: "Created By",
  },
  {
    id: "options",
    label: "Options",
  },
];

const Index = () => {
  const [tableElements, setTableElements] = useState(rows);
  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
  };
  return (
    <TableWrapper
      rows={rows}
      // onSaveFunction={onCreateFunction}
      // onChangeFunction={onChangeFunction}
      // deleteFunction={onDeleteFunction}
      // refetch={refetch}
      // errorMessage={errorMessage}
      headCells={headCells}
      TableRowComponent={TableRowComponent}
    />
  );
};

export default React.memo(Index);
