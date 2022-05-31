import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddSave: Function;
  onAddCancel: Function;
}> = ({ row, onDelete, onAddSave, onAddCancel }) => {
  const {
    onCancel,
    handleChange,
    editStateBoolean,
    handleChangeEvent,
    handleEditableState,
    onSave,
    editState,
    validateState,
    onChangeValidateState,
  } = UseEditableTable(row);

  const SummaryObject = {
    handleChangeEvent,
    handleChange,
    summaryState: editState,
    editStateBoolean,
    titleVisibly: false,
  };
  return (
    <TableRow style={!validateState ? { backgroundColor: "#ececec" } : {}}>
      <TableCell component="th" scope="row" width={"300px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "date",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"600px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "comments",
          width: "100",
        })}
      </TableCell>
      <TableCell width={"200px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "createdBy",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        <OptionsBlock
          editStateBoolean={editStateBoolean}
          onSave={() => {
            editStateBoolean === "add" && onAddSave();
            onSave();
          }}
          onCancel={editStateBoolean === "add" ? onAddCancel : onCancel}
          handleEditableState={handleEditableState}
          onDelete={onDelete}
          id={row.id}
          validateState={validateState}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
