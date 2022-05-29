import React, { CSSProperties, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";

const dropArray = [
  {
    label: "Something",
  },
  {
    label: "Lorem",
  },
];

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
}> = ({ row, onDelete }) => {
  const {
    onCancel,
    handleChange,
    editStateBoolean,
    handleChangeEvent,
    handleEditableState,
    onSave,
    editState,
    onChangeValidateState,
    validateState,
  } = UseEditableTable(row);

  const SummaryObject = {
    handleChangeEvent,
    handleChange,
    summaryState: editState,
    editStateBoolean,
    titleVisibly: false,
  };
  return (
    <TableRow style={!validateState ? { backgroundColor: "#ececec" } : {}}>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "personId",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "personType",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "firstName",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "lastName",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "superArea",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "area",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "locations",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "phones",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "department",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "pi",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "card",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "activeUnit",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "leftUC",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "campus",
        })}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
