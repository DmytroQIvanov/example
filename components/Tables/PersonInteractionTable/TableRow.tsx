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
  handleOpenPersonInteractionModal:()=>void;

}> = ({ row, onDelete, onAddSave, onAddCancel,handleOpenPersonInteractionModal }) => {
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
          editStateBoolean={false}
          onSave={() => {
          }}
          addIcon

          onCancel={()=>{}}
          handleEditableState={handleOpenPersonInteractionModal}
          onDelete={onDelete}
          id={row.id}
          validateState={summaryObject.rowValues.validateState}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
