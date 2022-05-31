import React, { CSSProperties, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import TableRow from "@material-ui/core/TableRow";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditSharpIcon from "@mui/icons-material/EditSharp";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
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
    <TableRow>
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...SummaryObject,
            name: "electronicAddress",
            title: "Electronic Address",
          })}
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "electronicType",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>

      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "source",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "emailOptions",
          type: "checkBox",
          checkBox: {
            type: "green",
            textVariants: {
              falseVariant: "No",
              trueVariant: "Preffered",
            },
          },
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...SummaryObject, name: "dfkv" })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dlkv",
          validate: {
            disabled: !validateState,
            label: "validate",
            onClick: () => onChangeValidateState(true),
          },
        })}
      </TableCell>
      <TableCell width={"130px"}>
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
