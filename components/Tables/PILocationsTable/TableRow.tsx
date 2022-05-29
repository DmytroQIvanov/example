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
          name: "campus",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "location1",
        })}
        {EditableBlock({
          ...SummaryObject,
          name: "location2",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "informationSource",
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "propagate",
          type: "checkBox",
          checkBox: {
            textVariants: {
              trueVariant: "Yes",
              falseVaruant: "No",
            },
          },
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "comments",
          multiline: 6,
          width: 100,
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dfkv",
          type: "date",
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dlkv",
          type: "date",
          validate: { label: "Validate", onClick: onChangeValidateState },
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dmi",
          type: "date",
          checkBox: { label: "Invalidate" },
        })}
      </TableCell>
      <TableCell width={"130px"}>
        <OptionsBlock
          editStateBoolean={editStateBoolean}
          onSave={onSave}
          onCancel={onCancel}
          handleEditableState={handleEditableState}
          onDelete={onDelete}
          id={row.id}
          validateState={validateState}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
