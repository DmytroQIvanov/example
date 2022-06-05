import React from "react";
import TableCell from "@material-ui/core/TableCell";
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
        !summaryObject.rowValues.validateState
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "type",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "oldValue",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "newValue",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...summaryObject, name: "createdBy" })}
      </TableCell>
      {/*<TableCell width={"130px"}>*/}
      {/*  <OptionsBlock*/}
      {/*    editStateBoolean={editStateBoolean}*/}
      {/*    onSave={() => {*/}
      {/*      editStateBoolean === "add" && onAddSave();*/}
      {/*      onSave();*/}
      {/*    }}*/}
      {/*    onCancel={editStateBoolean === "add" ? onAddCancel : onCancel}*/}
      {/*    handleEditableState={handleEditableState}*/}
      {/*    onDelete={onDelete}*/}
      {/*    id={row.id}*/}
      {/*    validateState={validateState}*/}
      {/*  />*/}
      {/*</TableCell>*/}
    </TableRow>
  );
};

export default TableRowComponent;
