import React, { CSSProperties, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import AddressEditModal from "../../Table/RowCells/AddressEditModal";

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddSave: Function;
  onAddCancel: Function;
  onSaveWithProvidedState: (state: any) => void;
}> = ({ row, onDelete, onAddSave, onAddCancel, onSaveWithProvidedState }) => {
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
    // onChangeWithProvidedState,
  } = UseEditableTable(row);

  const SummaryObject = {
    handleChangeEvent,
    handleChange,
    summaryState: editState,
    editStateBoolean,
    titleVisibly: false,
  };

  const [stateModal, setStateModal] = useState(false);
  const onHandleClose = () => {
    setStateModal(false);
  };
  const onHandleOpen = () => {
    setStateModal(true);
  };
  return (
    <TableRow style={!validateState ? { backgroundColor: "#ececec" } : {}}>
      <TableCell component="th" scope="row" width={"200px"}>
        {editState["full"]}
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {editState["city"]} {editState["state"]}
        {editState["country"]}
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {editState["source"]}
      </TableCell>

      <TableCell component="th" scope="row" width={"340px"}>
        {editState["comments"]}
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dfkv",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dlkv",
          type: "date",

          validate: {
            disabled: !validateState,
            label: "validate",
            onClick: () => onChangeValidateState(true),
          },
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "marketInvalid",
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
          onSave={() => {}}
          onCancel={editStateBoolean === "add" ? onAddCancel : onCancel}
          handleEditableState={onHandleOpen}
          onDelete={onDelete}
          id={row.id}
          validateState={validateState}
          documentElement
        />
      </TableCell>
      <AddressEditModal
        data={{ address: editState }}
        open={stateModal}
        handleClose={onHandleClose}
        onChangeAddress={onSaveWithProvidedState}
      />
    </TableRow>
  );
};

export default TableRowComponent;
