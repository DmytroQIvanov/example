import React, { CSSProperties, useEffect, useState } from "react";
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
          name: "nameSourceType",
          type: "dropdown",
          itemsArray: dropArray,
        })}

        {EditableBlock({
          ...SummaryObject,
          name: "nameSourceSubType",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>

      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "firstName",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "middleNames",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...SummaryObject, name: "lastName" })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({ ...SummaryObject, name: "nickName" })}
        {EditableBlock({ ...SummaryObject, name: "suffix" })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dfkv",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dlkv",
          validate: {
            disabled: !validateState,
            label: "validate",
            onClick: () => onChangeValidateState(true),
          },
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dmi",
          type: "date",
          checkBox: {
            label: "Invalidate",
            onClick: () => onChangeValidateState(!validateState),
            value: !validateState,
            disabled: !validateState,
          },
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
