import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddSave: Function;
  onAddCancel: Function;
  activeRowObject: IActiveRowObject;
}> = ({ row, onDelete, onAddSave, onAddCancel, activeRowObject }) => {
  const { onCancel, onSave, changeRowState, summaryObject } = UseEditableTable({
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
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "personId",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "personType",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "firstName",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "lastName",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "superArea",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "area",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "locations",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "phones",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "department",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "pi",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "card",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "activeUnit",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "leftUC",
        })}
      </TableCell>

      <TableCell component="th" scope="row" width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "campus",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        <OptionsBlock
          onSave={() => {
            activeRowObject.activeRow.state === "add" && onAddSave();
            onSave();
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
