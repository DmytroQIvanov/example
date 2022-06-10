import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";


const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddSave: Function;
  onAddCancel: Function;
}> = ({ row }) => {
  const {  summaryObject } =
    UseEditableTable(row);

  return (
    <TableRow
      style={
        !summaryObject.rowValues.datemarkedinvalid
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "type",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "oldValue",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "newValue",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...summaryObject, name: "createdBy" })}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
