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
  onAddSave: Function;
  onAddCancel: Function;
}> = ({ row, onDelete, onAddSave, onAddCancel }) => {
  const {
    onCancel,
    handleChange,
    editStateBoolean,
    handleChangeEvent,
    handleEditableState,
    onSave,
    editState,
    validateState,
    onChangeValidateState,
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
              falseVariant: "No",
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

          validate: {
            disabled: !validateState,
            label: "validate",
            onClick: () => onChangeValidateState(true),
          },
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dmi",
          type: "date",
          checkBox: {
            label: "Invalidate",
            onClick: () => onChangeValidateState(!validateState),
            value: !validateState,
            disabled: !validateState,
          },
        })}
      </TableCell>
      <TableCell width={"130px"}>
        <OptionsBlock
          editStateBoolean={editStateBoolean}
          onSave={() => {
            editStateBoolean === "add" && onAddSave();
            onSave();
          }}
          onCancel={editStateBoolean === "add" ? onAddCancel : onCancel}
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
