import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
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
  const { onCancel, onSave, changeRowState, summaryObject } =
    UseEditableTable(row);

  return (
    <TableRow
      style={
        summaryObject.rowValues.datemarkedinvalid
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"400px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "jobTitle",
            type: "dropdown",
            itemsArray: dropArray,
            title: "Job Title",
          })}
        </Box>
        <Box sx={{ display: "flex", mt: "25px" }}>
          <Box width={"50%"}>
            Campus:
            {EditableBlock({
              ...summaryObject,
              name: "campus",
              type: "dropdown",
              itemsArray: dropArray,
            })}
          </Box>
          <Box sx={{ ml: "20px" }} width={"50%"}>
            Source:
            {EditableBlock({
              ...summaryObject,
              name: "source",
              type: "dropdown",
              itemsArray: dropArray,
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"250px"}>
        {EditableBlock({
          ...summaryObject,
          name: "unit",
          title: "Unit",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell width={"250px"}>
        <Box>
          <Box>
            {EditableBlock({
              ...summaryObject,
              name: "dataStart",
              title: "Date start",
              titleVisibly: false,
            })}
          </Box>
          <Box sx={{ mt: "20px" }}>
            {EditableBlock({
              ...summaryObject,
              name: "dataEnd",
              titleVisibly: false,
              title: "Date end",
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"200px"}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ position: "relative" }}>
            {EditableBlock({
              ...summaryObject,
              name: "apt",
              title: "Apt",
              titleVisibly: false,
            })}
            <Box
              sx={{
                position: "absolute",
                right: "-13px",
                transform: "translateY(-50%)",
                top: summaryObject.rowState == "default" ? "61%" : "67%",
                fontSize: "22px",
              }}
            >
              /
            </Box>
          </Box>

          <Box sx={{ ml: "20px" }}>
            {EditableBlock({
              ...summaryObject,
              name: "salary",
              title: "Salary",
              titleVisibly: false,
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"400px"}>
        {EditableBlock({
          ...summaryObject,
          name: "comments",
          multiline: 6,
          title: "Comments",
          width: 100,
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({ ...summaryObject, name: "dfkv", title: "DFKV" })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dlkv",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dmi",
          type: "date",
        })}

        {EditableBlock({
          ...summaryObject,
          type: "invalidate",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        <OptionsBlock
          editStateBoolean={summaryObject.rowState}
          onSave={() => {
            summaryObject.rowState === "add" && onAddSave();
            onSave();
          }}
          onCancel={summaryObject.rowState === "add" ? onAddCancel : onCancel}
          handleEditableState={changeRowState}
          onDelete={onDelete}
          id={row.id}
          validateState={summaryObject.rowValues.validateState}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
