import React, { CSSProperties, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import TableRow from "@material-ui/core/TableRow";

//STYLES
import styles from "./PersonEmpoymentTable.module.css";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";

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
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...SummaryObject,
            name: "campus",
            type: "dropdown",
            itemsArray: dropArray,
          })}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"300px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "superArea",
          type: "dropdown",
          itemsArray: dropArray,
        })}
        <Box sx={{ mt: "20px" }}>
          {EditableBlock({
            ...SummaryObject,
            name: "area",
            type: "dropdown",
            itemsArray: dropArray,
          })}
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "turf",
        })}
      </TableCell>
      <TableCell width={"100px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "informationSource",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>

      <TableCell width={"100px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "suppress",
          type: "checkBox",
          checkBox: {
            textVariants: { trueVariant: "Yes", falseVariant: "No" },
          },
        })}
      </TableCell>

      <TableCell width={"100px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "pi",
          type: "checkBox",
          checkBox: {
            textVariants: { trueVariant: "Yes", falseVariant: "No" },
          },
        })}
      </TableCell>

      <TableCell width={"400px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "comments",
          multiline: 6,
          title: "Comments",
          width: 100,
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...SummaryObject, name: "dfkv", title: "DFKV" })}
      </TableCell>
      <TableCell width={"130px"}>
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
      <TableCell width={"220px"}>
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
    </TableRow>
  );
};

export default TableRowComponent;
