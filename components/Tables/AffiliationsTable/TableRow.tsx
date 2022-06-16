import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import TableRow from "@material-ui/core/TableRow";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { IActiveRowObject } from "../TablesComponents/Interfaces/TableWrapperInterfaces";

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
  handleChangeMainStateEvent: any;
  handleChangeMainState: any;
  activeRowObject: IActiveRowObject;
}> = ({
  row,
  onDelete,
  onAddSave,
  onAddCancel,
  activeRowObject,
  handleChangeMainStateEvent,
  handleChangeMainState,
}) => {
  const { onCancel, onSave, changeRowState, summaryObject } = UseEditableTable({
    row,
    activeRowObject,
    handleChangeMainStateEvent,
    handleChangeMainState,
  });

  return (
    <TableRow
      style={
        summaryObject.rowValues.datemarkedinvalid
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "campus",
            type: "dropdown",
            itemsArray: dropArray,
          })}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "organization1",
            type: "dropdown",
            itemsArray: dropArray,
          })}
        </Box>
        <Box sx={{ mt: "20px" }}>
          {EditableBlock({
            ...summaryObject,
            name: "organization2",
            type: "dropdown",
            itemsArray: dropArray,
          })}
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        <EditableBlock
          {...summaryObject}
          name={"informationSource"}
          type="dropdown"
          itemsArray={dropArray}
        />
      </TableCell>
      <TableCell width={"100px"}>
        <EditableBlock
          {...summaryObject}
          {...{
            name: "primary",
            type: "checkBox",
            checkBox: {
              type: "green",
              textVariants: { trueVariant: "YES", falseVariant: "NO" },
            },
          }}
        />
      </TableCell>
      <TableCell width={"400px"}>
        {EditableBlock({
          ...summaryObject,
          name: "comments",
          multiline: 6,
          width: 100,
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dfkv",
          type: "date",
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dlkv",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dmi",
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
          id={summaryObject.rowValues.id}
          activeRowObject={activeRowObject}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
