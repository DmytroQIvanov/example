import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import AddressEditModal from "./AddressEditModal";
import { Box } from "@mui/material";
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
  refetch,
}) => {
  const { onCancel, summaryObject, onSave } = UseEditableTable({
    row,
    activeRowObject,
    onSaveWithProvidedState,
    onChangeWithProvidedState,
    onAddCancel,
    refetch,
  });

  const [stateModal, setStateModal] = useState(false);
  const onHandleClose = () => {
    setStateModal(false);
  };
  const onHandleOpen = () => {
    setStateModal(true);
  };
  return (
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"450px"}>
        <Box
          sx={{ mr: "2px", display: "flex", flexWrap: "wrap", gap: "4px 7px" }}
        >
          <span>{summaryObject.rowValues["street_number"]}</span>
          <span>{summaryObject.rowValues["street_name"]}</span>
          <span>{summaryObject.rowValues["apartment"]}</span>

          <span>{summaryObject.rowValues["city"]} </span>
          <span>{summaryObject.rowValues["state"]} </span>
          <span>{summaryObject.rowValues["country"]} </span>
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        <Box sx={{ mr: "2px", display: "flex", gap: "2px" }}>
          {summaryObject.rowValues["accuracy"]}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {
          summaryObject.rowValues["information_source_type"]
            ?.information_source_type
        }
      </TableCell>
      <TableCell component="th" scope="row" width={"340px"}>
        {summaryObject.rowValues["comments"]}
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_first_known_valid",
          type: "date",
        })}
      </TableCell>
      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_last_known_valid",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_marked_invalid",
          type: "date",
        })}

        {EditableBlock({
          ...summaryObject,
          type: "invalidate",
        })}
      </TableCell>
      <TableCell width={"130px"}>
        <OptionsBlock
          onSave={onSave}
          onCancel={onCancel}
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
        rowState={"change"}
        refetch={refetch}
        handleClose={onHandleClose}
        onChangeAddress={(state: any) => {
          summaryObject.rowState === "add"
            ? onSaveWithProvidedState(state)
            : onChangeWithProvidedState(state, summaryObject.rowValues.id);
        }}
        title={"Changing home address"}
      />
    </TableRowWrapper>
  );
};

export default TableRowComponent;
