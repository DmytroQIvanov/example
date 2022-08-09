import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";
import { UseGetLocation } from "../../../hooks/UseGetLocation";

const dropArray = [
  {
    label: "Something",
  },
  {
    label: "Lorem",
  },
];

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
  const { onCancel, summaryObject, onSave } = UseEditableTable({
    row,
    activeRowObject,
    onSaveWithProvidedState,
    onChangeWithProvidedState,
    onAddCancel,
  });

  const { locationsArray } = UseGetLocation();
  return (
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "room",
          })}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"300px"}>
        {EditableBlock({
          ...summaryObject,
          name: "floor",
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"300px"}>
        {EditableBlock({
          ...summaryObject,
          name: "location_type.location_type",
          idName: "location_type.location_type_id",
          type: "dropdown",
          itemsArray: locationsArray,
        })}
      </TableCell>
      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_created",
          type: "date",
          disabled: true,
          availableStateBoolean: false,
        })}
      </TableCell>
      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          // name: "location_type_id",
          name: "location_id",
          disabled: true,
          // editable:false,
        })}
      </TableCell>

      <TableCell width={"130px"}>
        <OptionsBlock
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
          rowValues={summaryObject.rowValues}
          id={summaryObject.rowValues.id}
          activeRowObject={activeRowObject}
        />
      </TableCell>
    </TableRowWrapper>
  );
};

export default TableRowComponent;
