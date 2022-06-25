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
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";

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

  return (
    <TableRow
      style={
        summaryObject.rowValues.validateState
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      <TableCell component="th" scope="row" width={"400px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "jobTitle",
            type: "dropdown",
            itemsArray: dropArray,
            title: "Job Title",
          })}
        </Box>
        <Box sx={{ display: "flex", mt: "25px" }}>
          <Box width={"50%"}>
            {/*Campus:*/}
            {EditableBlock({
              ...summaryObject,
              name: "campus",
              type: "dropdown",
              title: "Campus:",
              itemsArray: dropArray,
            })}
          </Box>
          <Box sx={{ ml: "20px" }} width={"50%"}>
            {/*Source:*/}
            {EditableBlock({
              ...summaryObject,
              name: "source",
              type: "dropdown",
              title: "Source:",

              itemsArray: dropArray,
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"250px"}>
        {EditableBlock({
          ...summaryObject,
          name: "unit",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell width={"250px"}>
        <Box>
          <Box>
            {EditableBlock({
              ...summaryObject,
              name: "dateStart",
              title: "Date start",
              titleVisibly: false,
              type: "date",
            })}
          </Box>
          <Box sx={{ mt: "20px" }}>
            {EditableBlock({
              ...summaryObject,
              name: "dateEnd",
              titleVisibly: false,
              title: "Date end",
              type: "date",
            })}
          </Box>
        </Box>
      </TableCell>
      <TableCell width={"200px"}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ position: "relative" }}>
            {EditableBlock({
              ...summaryObject,
              name: "apt",
              title: "Apt",
              titleVisibly: false,
            })}
            <Box
              sx={{
                position: "absolute",
                right: "-13px",
                transform: "translateY(-50%)",
                top: summaryObject.rowState == "default" ? "61%" : "67%",
                fontSize: "22px",
              }}
            >
              /
            </Box>
          </Box>

          <Box sx={{ ml: "20px" }}>
            {EditableBlock({
              ...summaryObject,
              name: "salary",
              title: "Salary",
              titleVisibly: false,
            })}
          </Box>
        </Box>
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
        {EditableBlock({ ...summaryObject, name: "dfkv", type: "date" })}
      </TableCell>
      <TableCell width={"230px"}>
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
          onSave={onSave}
          onCancel={onCancel}
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
