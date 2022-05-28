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
// import styles from "./PersonEmpoymentTable.module.css";
import EditableBlock from "../EditableBlock/index";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditSharpIcon from "@mui/icons-material/EditSharp";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

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
  //STATES
  const [editStateBoolean, setEditStateBoolean] = useState(false);
  const [rowState, setRowState] = useState(row);
  const [editState, setEditState] = useState<typeof row>(row);

  //HANDLERS
  const handleEditableState = () => {
    setEditStateBoolean((prevState) => !prevState);
  };
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleChange = (name: string, text: string | number) => {
    setEditState((prevState) => {
      return {
        ...prevState,
        [name]: text.toString(),
      };
    });
  };
  const onSave = () => {
    setRowState(editState);
    setEditStateBoolean(false);
  };
  const onCancel = () => {
    setEditState(rowState);
    setEditStateBoolean(false);
  };
  useEffect(() => {
    setRowState(row);
  }, [row]);

  useEffect(() => {
    setEditState(rowState);
  }, [editStateBoolean]);

  const SummaryObject = {
    handleChangeEvent,
    handleChange,
    summaryState: editState,
    editStateBoolean,
    titleVisibly: false,
  };
  return (
    <TableRow>
      <TableCell component="th" scope="row" width={"270px"}>
        <Box>
          {EditableBlock({
            ...SummaryObject,
            name: "phoneNumber",
            title: "Phone Number",
          })}
        </Box>
        <Box sx={{ display: "flex", mt: "25px" }}></Box>
      </TableCell>
      <TableCell width={"150px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "phoneType",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell width={"250px"}>
        <Box>
          <Box>
            {EditableBlock({
              ...SummaryObject,
              name: "card",
              type: "dropdown",
              itemsArray: dropArray,
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"200px"}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {EditableBlock({
            ...SummaryObject,
            name: "doNotCallDate",
            title: "Do Not Call Date",
            checkBox: { label: "Do Not Call" },
          })}
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
        {EditableBlock({
          ...SummaryObject,
          name: "dfkv",
          title: "DFKV",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dlkv",
          title: "DLKV",
          validate: {},
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
