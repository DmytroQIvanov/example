import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";

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
      <TableCell component="th" scope="row" width={"500px"}>
        {EditableBlock({
          ...summaryObject,
          name: "researchComments",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date",
          type: "date",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "createdBy",
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
    </TableRowWrapper>
  );
};

export default TableRowComponent;
