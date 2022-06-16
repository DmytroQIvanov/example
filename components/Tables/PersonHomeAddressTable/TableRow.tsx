import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import AddressEditModal from "./AddressEditModal";
import { Box } from "@mui/material";
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";
import Typography from "@mui/material/Typography";
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
  const { onCancel, summaryObject } = UseEditableTable({
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
        <Box
          sx={{ mr: "2px", display: "flex", flexWrap: "wrap", gap: "4px 7px" }}
        >
          <span>{summaryObject.rowValues["streetnumber"]}</span>
          <span>{summaryObject.rowValues["streetname"]}</span>
          <span>{summaryObject.rowValues["apartment"]}</span>

          <span>{summaryObject.rowValues["city"]} </span>
          <span>{summaryObject.rowValues["state"]} </span>
          <span>{summaryObject.rowValues["country"]} </span>
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
            if (activeRowObject.activeRow.state === "add") {
              onAddCancel();
              onSaveWithProvidedState(summaryObject.rowValues);
            } else {
              onChangeWithProvidedState(summaryObject.rowValues);
            }
            onCancel();
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
          handleEditableState={onHandleOpen}
        />
      </TableCell>
      <AddressEditModal
        data={{ address: summaryObject.rowValues }}
        open={stateModal}
        handleClose={onHandleClose}
        onChangeAddress={
          summaryObject.rowState === "add"
            ? onSaveWithProvidedState
            : onChangeWithProvidedState
        }
      />
    </TableRow>
  );
};

export default TableRowComponent;
