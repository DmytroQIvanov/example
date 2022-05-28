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
import EditSharpIcon from "@mui/icons-material/EditSharp";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableBlock from "../EditableBlock/index";
import { UseEditableTable } from "../../hooks/UseEditableTable";

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
          title: "Source",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "emailOptions",
          title: "emailOptions",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...SummaryObject, name: "dfkv", title: "DFKV" })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...SummaryObject, name: "dlkv", title: "DLKV" })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dmi",
          title: "DMI",
          checkBox: { label: "Invalidate" },
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {editStateBoolean ? (
          <Box sx={{ mt: "20px" }}>
            <SaveIcon onClick={onSave} sx={{ cursor: "pointer", mr: "10px" }} />
            <CancelIcon onClick={onCancel} sx={{ cursor: "pointer" }} />
          </Box>
        ) : (
          <>
            <EditSharpIcon
              onClick={handleEditableState}
              sx={{ cursor: "pointer", mr: "10px" }}
            />
            <DeleteIcon
              onClick={() => {
                onDelete(row.id);
              }}
              sx={{ cursor: "pointer" }}
            />
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
