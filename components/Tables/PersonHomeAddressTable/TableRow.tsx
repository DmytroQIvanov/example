import React, { useState } from "react";
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
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddSave: Function;
  onAddCancel: Function;
  activeRowObject: IActiveRowObject;
  onSaveWithProvidedState: (state: any) => void;
}> = ({
  row,
  onDelete,
  onAddSave,
  onAddCancel,
  activeRowObject,
  onSaveWithProvidedState,
}) => {
  const { onCancel, onSave, changeRowState, summaryObject } = UseEditableTable({
    row,
    activeRowObject,
  });

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
        summaryObject.rowValues.datemarkedinvalid
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"450px"}>
        <Box sx={{ mr: "2px", display: "flex", gap: "2px" }}>
          <Box sx={{ mr: "2px" }}>
            {summaryObject.rowValues["streetnumber"]}
          </Box>
          <Box sx={{ mr: "2px" }}>{summaryObject.rowValues["streetname"]}</Box>
          <Box sx={{ mr: "2px" }}>{summaryObject.rowValues["apartment"]}</Box>

          <Box sx={{ mr: "2px" }}>{summaryObject.rowValues["city"]} </Box>
          <Box sx={{ mr: "2px" }}>{summaryObject.rowValues["state"]} </Box>
          <Box sx={{ mr: "2px" }}>{summaryObject.rowValues["country"]} </Box>
        </Box>
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        <Box sx={{ mr: "2px", display: "flex", gap: "2px" }}></Box>
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {
          summaryObject.rowValues["information_source_type"]
            ?.informationsourcetype
        }
      </TableCell>

      <TableCell component="th" scope="row" width={"340px"}>
        {summaryObject.rowValues["comments"]}
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "datefirstknownvalid",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "datelastknownvalid",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "datemarkedinvalid",
          type: "date",
        })}

        {EditableBlock({
          ...summaryObject,
          type: "invalidate",
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
          documentElement
          id={summaryObject.rowValues.id}
          activeRowObject={activeRowObject}
        />
      </TableCell>
      <AddressEditModal
        data={{ address: summaryObject.rowValues }}
        open={stateModal}
        handleClose={onHandleClose}
        onChangeAddress={
          summaryObject.rowState === "add"
            ? onSaveWithProvidedState
            : summaryObject.saveWithProvidedState
        }
      />
    </TableRow>
  );
};

export default TableRowComponent;
