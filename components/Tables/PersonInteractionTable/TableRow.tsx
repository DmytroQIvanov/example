import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";

const TableRowComponent: React.FC<
  ITableRowComponent<IRowsPersonEmploymentTable>
> = (props) => {
  const { onDelete, activeRowObject, handleOpenPersonInteractionModal } = props;
  const { onCancel, summaryObject } = UseEditableTable({
    ...props,
  });

  return (
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "category",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "interaction",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "response",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "informationSource",
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "organizers",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "interactionDate",
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "createdBy",
        })}
      </TableCell>

      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dateCreated",
        })}
      </TableCell>

      <TableCell width={"170px"}>
        <OptionsBlock
          addIcon={{ onClick: handleOpenPersonInteractionModal }}
          onSave={() => {}}
          onCancel={() => {}}
          onDelete={onDelete}
          rowValues={summaryObject.rowValues}
          id={summaryObject.rowValues.id}
          activeRowObject={activeRowObject}
          handleEditableState={() => {}}
          // documentElement
        />
      </TableCell>
    </TableRowWrapper>
  );
};

export default TableRowComponent;
