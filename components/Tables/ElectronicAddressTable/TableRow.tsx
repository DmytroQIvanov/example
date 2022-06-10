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
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "electronicAddress",
            title: "Electronic Address",
          })}
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "electronicType",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>

      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "source",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "emailOptions",
          type: "checkBox",
          checkBox: {
            type: "green",
            textVariants: {
              falseVariant: "No",
              trueVariant: "Preffered",
            },
            label: "Preffered",
          },
        })}

        {EditableBlock({
          ...summaryObject,
          name: "supress",
          type: "checkBox",
          checkBox: {
            type: "green",
            textVariants: {
              falseVariant: "",
              trueVariant: "",
            },
            label: "Supress",
          },
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...summaryObject, name: "dfkv" })}
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
