import React, {
  ChangeEventHandler,
  CSSProperties,
  useEffect,
  useState,
} from "react";
import TableCell from "@material-ui/core/TableCell";
import {
  Autocomplete,
  Box,
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

const dropArray = [
  {
    label: "Something",
  },
  {
    label: "Lorem",
  },
];

interface propsBlockWithState {
  title?: string;
  name: string;
  disabled?: boolean;
  width?: number;
  itemsArray?: { label: string }[];
  type?: "textField" | "dropdown";
  multiline?: number;
  editStateBoolean: boolean;
  summaryState: { [index: string]: any };
  titleVisibly?: boolean;
  handleChange: Function;
  style?: CSSProperties;
  className?: string;
  handleChangeEvent: (
    e: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const blockWithState: React.FC<propsBlockWithState> = ({
  title,
  name,
  width,
  type = "textField",
  multiline,
  itemsArray,
  summaryState,
  editStateBoolean,
  handleChange,
  handleChangeEvent,

  titleVisibly = true,
  ...inputParams
}) => {
  return (
    <Grid container direction="column" position="relative">
      <Grid item>
        {title && (
          <>
            {!titleVisibly ? (
              editStateBoolean && (
                <Typography color={"gray"}>{title}</Typography>
              )
            ) : (
              <Typography color={"gray"}>{title}</Typography>
            )}
          </>
        )}
      </Grid>
      <Grid item width={width && `${width}%`}>
        {editStateBoolean ? (
          type === "dropdown" && itemsArray && itemsArray.length >= 1 ? (
            <Autocomplete
              disablePortal
              options={itemsArray && itemsArray}
              fullWidth={width ? true : false}
              {...inputParams}
              value={{ label: summaryState[name] }}
              onChange={(
                event: any,
                newValue: { label: string | number } | null
              ) => {
                if (newValue !== null) handleChange(name, newValue.label);
              }}
              renderInput={(params) => (
                <TextField {...params} size={"small"} label={""} name={name} />
              )}
            />
          ) : (
            <TextField
              fullWidth={width ? true : false}
              onChange={handleChangeEvent}
              name={name}
              variant="outlined"
              value={summaryState[name]}
              multiline={multiline ? true : false}
              rows={multiline}
              d
              size={"small"}
              {...inputParams}
            />
          )
        ) : (
          <Typography mt={0.8}>{summaryState[name]}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string) => void;
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
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {blockWithState({
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
            {blockWithState({
              ...SummaryObject,
              name: "campus",
              type: "dropdown",
              itemsArray: dropArray,
              className: styles.blueInput,
            })}
          </Box>
          <Box sx={{ ml: "20px" }}>
            Source:
            {blockWithState({
              ...SummaryObject,
              name: "source",
              type: "dropdown",
              itemsArray: dropArray,
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        {blockWithState({ ...SummaryObject, name: "unit", title: "Unit" })}
      </TableCell>
      <TableCell width={"250px"}>
        <Box>
          <Box>
            {blockWithState({
              ...SummaryObject,
              name: "dataStart",
              title: "Date start",
            })}
          </Box>
          <Box sx={{ mt: "20px" }}>
            {blockWithState({
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
            {blockWithState({ ...SummaryObject, name: "apt", title: "Apt" })}
          </Box>
          <Typography mt={0.8} ml={2.5}>
            \
          </Typography>

          <Box sx={{ ml: "20px" }}>
            {blockWithState({
              ...SummaryObject,
              name: "salary",
              title: "Salary",
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"400px"}>
        {blockWithState({
          ...SummaryObject,
          name: "comments",
          multiline: 6,
          title: "Comments",
          width: "320px",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {blockWithState({ ...SummaryObject, name: "dfkv", title: "DFKV" })}
      </TableCell>
      <TableCell width={"130px"}>
        {blockWithState({ ...SummaryObject, name: "dlkv", title: "DLKV" })}
        <Chip
          label="Validate"
          sx={{ backgroundColor: "#3d3de1", color: "white", mt: "5px" }}
        />
      </TableCell>
      <TableCell width={"130px"}>
        {blockWithState({ ...SummaryObject, name: "dmi", title: "DMI" })}

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Invalidate"
        />
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
