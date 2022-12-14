import React from "react";
import TableCell from "@material-ui/core/TableCell";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

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
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"210px"}>
        {EditableBlock({
          ...summaryObject,
          name: "campus",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "location1",
          type: "dropdown",
          itemsArray: dropArray,
        })}

        {EditableBlock({
          ...summaryObject,
          name: "location2",
          type: "dropdown",
          editable: true,
          itemsArray: dropArray,
        })}
      </TableCell>

      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "informationSource",
          type: "dropdown",
          itemsArray: dropArray,
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "primary",
          type: "checkBox",
          checkBox: {
            type: "green",
            textVariants: { falseVariant: "N/A", trueVariant: "Yes" },
          },
        })}
      </TableCell>
      <TableCell width={"330px"}>
        {EditableBlock({
          ...summaryObject,
          name: "comments",
          multiline: 6,
          width: 100,
        })}
      </TableCell>
      <TableCell width={"220px"}>
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
        {EditableBlock({
          ...summaryObject,
          name: "validate",
          type: "validate",
        })}
      </TableCell>
      <TableCell width={"330px"}>
        {EditableBlock({
          ...summaryObject,
          name: "dmi",
          type: "date",
        })}

        {EditableBlock({
          ...summaryObject,
          name: "validate",
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
    </TableRowWrapper>
  );
};

export default TableRowComponent;
