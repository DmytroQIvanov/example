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
            name: "jobTitle",
            type: "dropdown",
            itemsArray: dropArray,
            title: "Job Title",
          })}
        </Box>
        <Box sx={{ display: "flex", mt: "25px" }}>
          <Box>
            Campus:
            {EditableBlock({
              ...SummaryObject,
              name: "campus",
              type: "dropdown",
              itemsArray: dropArray,
              className: styles.blueInput,
            })}
          </Box>
          <Box sx={{ ml: "20px" }}>
            Source:
            {EditableBlock({
              ...SummaryObject,
              name: "source",
              type: "dropdown",
              itemsArray: dropArray,
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        {EditableBlock({ ...SummaryObject, name: "unit", title: "Unit" })}
      </TableCell>
      <TableCell width={"250px"}>
        <Box>
          <Box>
            {EditableBlock({
              ...SummaryObject,
              name: "dataStart",
              title: "Date start",
            })}
          </Box>
          <Box sx={{ mt: "20px" }}>
            {EditableBlock({
              ...SummaryObject,
              name: "dataEnd",
              title: "Date end",
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"200px"}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            {EditableBlock({ ...SummaryObject, name: "apt", title: "Apt" })}
          </Box>
          <Typography sx={{ m: "auto" }}>/</Typography>

          <Box sx={{ ml: "20px" }}>
            {EditableBlock({
              ...SummaryObject,
              name: "salary",
              title: "Salary",
            })}
          </Box>
        </Box>
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
          title: "DLKV",
          validate: { label: "validate", onClick: onChangeValidateState },
        })}
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
        {validateState &&
          (editStateBoolean ? (
            <Box sx={{ mt: "20px" }}>
              <SaveIcon
                onClick={onSave}
                sx={{ cursor: "pointer", mr: "10px" }}
              />
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
          ))}
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
