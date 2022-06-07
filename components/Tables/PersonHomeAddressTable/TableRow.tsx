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
import { Box } from "@mui/material";

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddSave: Function;
  onAddCancel: Function;
  onSaveWithProvidedState: (state: any) => void;
}> = ({ row, onDelete, onAddSave, onAddCancel, onSaveWithProvidedState }) => {
  const { onCancel, onSave, changeRowState, summaryObject, } =
    UseEditableTable(row);

  const [stateModal, setStateModal] = useState(false);
  const onHandleClose = () => {
    setStateModal(false);
  };
  const onHandleOpen = () => {
    setStateModal(true);
  };
  return (
    <TableRow
      style={
        !summaryObject.rowValues.validateState
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"200px"}>
        <Box sx={{mr:'2px',display:'flex',gap:'2px'}}>
          <Box sx={{mr:'2px'}}>
            {summaryObject.rowValues["street_number"]}
          </Box>
          <Box sx={{mr:'2px'}}>
            {summaryObject.rowValues["street"]}
          </Box>
          <Box sx={{mr:'2px'}}>
            {summaryObject.rowValues["apt"]}
          </Box>
        </Box>
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        <Box sx={{mr:'2px',display:'flex',gap:'2px'}}>

        <Box sx={{mr:'2px'}}>
          {summaryObject.rowValues["city"]}  </Box>
      <Box sx={{mr:'2px'}}>{summaryObject.rowValues["state"]} </Box>
      <Box sx={{mr:'2px'}}>
        {summaryObject.rowValues["country"]} </Box>
        </Box>
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {summaryObject.rowValues["source"]}
      </TableCell>

      <TableCell component="th" scope="row" width={"340px"}>
        {summaryObject.rowValues["comments"]}
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dfkv",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dlkv",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "marketInvalid",
          type: "date",
        })}

        {EditableBlock({
          ...summaryObject,
          type: "invalidate",
        })}
      </TableCell>

      <TableCell width={"130px"}>
        <OptionsBlock
          editStateBoolean={summaryObject.rowState}
          onSave={() => {
            summaryObject.rowState === "add" && onAddSave();
            onSave();
          }}
          onCancel={summaryObject.rowState === "add" ? onAddCancel : onCancel}
          handleEditableState={onHandleOpen}
          onDelete={onDelete}
          documentElement
          id={row.id}
          validateState={summaryObject.rowValues.validateState}
        />
      </TableCell>
      <AddressEditModal
        data={{ address: summaryObject.rowValues }}
        open={stateModal}
        handleClose={onHandleClose}
        onChangeAddress={summaryObject.rowState === "add"? onSaveWithProvidedState: summaryObject.saveWithProvidedState }
      />
    </TableRow>
  );
};

export default TableRowComponent;
