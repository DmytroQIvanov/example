import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import TableRow from "@material-ui/core/TableRow";

//STYLES
import EditableBlock from "../TablesComponents/EditableBlock";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
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
        !summaryObject.rowValues.datemarkedinvalid
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"270px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "phoneNumber",
            title: "Phone Number",
          })}
        </Box>
        <Box sx={{ display: "flex", mt: "25px" }}></Box>
      </TableCell>
      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "phoneType",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell width={"250px"}>
        <Box>
          <Box>
            {EditableBlock({
              ...summaryObject,
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
            ...summaryObject,
            name: "doNotCallDate",
            type: "date",
            title: "Do Not Call Date",
            checkBox: { label: "Do Not Call" },
          })}
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
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dfkv",
          title: "DFKV",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dlkv",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"130px"}>
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
