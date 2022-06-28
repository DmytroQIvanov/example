import React from "react";
import TableCell from "@material-ui/core/TableCell";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

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
    <TableRowWrapper summaryObject={summaryObject}>
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
    </TableRowWrapper>
  );
};

export default TableRowComponent;
