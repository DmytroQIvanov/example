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
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";
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
  const { onCancel, summaryObject, onSave } = UseEditableTable({
    row,
    activeRowObject,
    onSaveWithProvidedState,
    onChangeWithProvidedState,
    onAddCancel,
  });

  return (
    <TableRow
      style={
        summaryObject.rowValues.datemarkedinvalid
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"200px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "date",
            type: "date",
            editable: true,
          })}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "type",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "wages",
        })}
      </TableCell>
      <TableCell width={"150px"}>
        <EditableBlock {...summaryObject} name={"hours"} />
      </TableCell>
      <TableCell width={"100px"}>
        <EditableBlock {...summaryObject} name={"deductions"} />
      </TableCell>
      <TableCell width={"120px"}>
        {EditableBlock({
          ...summaryObject,
          name: "%",
        })}
      </TableCell>
      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "jobCode",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "report",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({ ...summaryObject, name: "transactions" })}
      </TableCell>
      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "campus",
          editable: true,
        })}
      </TableCell>
      <TableCell width={"130px"}>
        <OptionsBlock
          onSave={onSave}
          onCancel={onCancel}
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
