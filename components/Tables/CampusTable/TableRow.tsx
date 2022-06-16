import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import TableRow from "@material-ui/core/TableRow";
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";

const dropArray = [
  {
    label: "Something",
  },
  {
    label: "Lorem",
  },
];

const TableRowComponent: React.FC<
  ITableRowComponent<IRowsPersonEmploymentTable>
> = ({
  row,
  onDelete,
  onAddCancel,
  activeRowObject,
  onSaveWithProvidedState,
  onChangeWithProvidedState,
}) => {
  const { onCancel, summaryObject } = UseEditableTable({
    row,
    activeRowObject,
  });
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
            name: "campus",
            type: "dropdown",
            itemsArray: dropArray,
          })}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"300px"}>
        {EditableBlock({
          ...summaryObject,
          name: "superArea",
          type: "dropdown",
          itemsArray: dropArray,
        })}
        <Box sx={{ mt: "20px" }}>
          {EditableBlock({
            ...summaryObject,
            name: "area",
            type: "dropdown",
            itemsArray: dropArray,
          })}
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "turf",
        })}
      </TableCell>
      <TableCell width={"100px"}>
        {EditableBlock({
          ...summaryObject,
          name: "informationSource",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>

      <TableCell width={"100px"}>
        {EditableBlock({
          ...summaryObject,
          name: "suppress",
          type: "checkBox",
          checkBox: {
            textVariants: { trueVariant: "Yes", falseVariant: "No" },
          },
        })}
      </TableCell>

      <TableCell width={"100px"}>
        {EditableBlock({
          ...summaryObject,
          name: "pi",
          type: "checkBox",
          checkBox: {
            textVariants: { trueVariant: "Yes", falseVariant: "No" },
          },
        })}
      </TableCell>

      <TableCell width={"400px"}>
        {EditableBlock({
          ...summaryObject,
          name: "comments",
          multiline: 6,
          width: 100,
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dfkv",
          type: "date",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dlkv",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"220px"}>
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
          onSave={() => {
            if (activeRowObject.activeRow.state === "add") {
              onAddCancel();
              onSaveWithProvidedState(summaryObject.rowValues);
            } else {
              onChangeWithProvidedState(summaryObject.rowValues);
            }
            onCancel();
          }}
          onCancel={() => {
            activeRowObject.activeRow.state === "add" && onAddCancel();
            onCancel();
          }}
          onDelete={onDelete}
          rowValues={summaryObject.rowValues}
          id={summaryObject.rowValues.id}
          activeRowObject={activeRowObject}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
