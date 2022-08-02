import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";
import { useMutation, useQuery } from "@apollo/client";
import {
  ELECTRONIC_TYPE_QUERY,
  INVALIDATE_PERSON_ELECTRONIC,
  VALIDATE_PERSON_ELECTRONIC,
} from "../../../schemas/PersonElectronicSchema";
import { UseGetInformationSourceType } from "../../../hooks/UseGetInformationSourceType";

const TableRowComponent: React.FC<
  ITableRowComponent<IRowsPersonEmploymentTable>
> = (props) => {
  const { onDelete, activeRowObject } = props;

  const { onCancel, summaryObject, onSave } = UseEditableTable({
    ...props,
    validateSchema: VALIDATE_PERSON_ELECTRONIC,
    invalidateSchema: INVALIDATE_PERSON_ELECTRONIC,
  });

  const [electronicTypeArray, setElectronicTypeArray] = useState([]);

  const { data: electronicTypeDataArray } = useQuery(ELECTRONIC_TYPE_QUERY);

  useEffect(() => {
    electronicTypeDataArray?.electronic_type &&
      setElectronicTypeArray(
        electronicTypeDataArray.electronic_type.map((elem: any) => {
          return {
            id: elem.electronic_type_id,
            label: elem.electronic_type,
            //acronym
          };
        })
      );
  }, [electronicTypeDataArray]);

  const { informationSourceArray } = UseGetInformationSourceType();

  return (
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "electronic_address",
          })}
        </Box>
      </TableCell>
      <TableCell width={"250px"}>
        {EditableBlock({
          ...summaryObject,
          idName: "electronic_type.electronic_type_id",
          name: "electronic_type.electronic_type",
          type: "dropdown",
          itemsArray: electronicTypeArray,
        })}
      </TableCell>

      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "information_source_type.information_source_type",
          idName: "information_source_type.information_source_type_id",
          type: "dropdown",
          itemsArray: informationSourceArray,
        })}
      </TableCell>
      <TableCell width={"130px"}>
        {EditableBlock({
          ...summaryObject,
          name: "emailOptions",
          type: "checkBox",
          checkBox: {
            type: "green",
            textVariants: {
              falseVariant: "No",
              trueVariant: "Preffered",
            },
            label: "Preffered",
          },
        })}

        {EditableBlock({
          ...summaryObject,
          name: "supress",
          type: "checkBox",
          checkBox: {
            type: "green",
            textVariants: {
              falseVariant: "",
              trueVariant: "",
            },
            label: "Supress",
          },
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_first_known_valid",
          type: "date",
        })}
      </TableCell>
      <TableCell width={"230px"}>
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
          id={summaryObject.rowValues.id}
          activeRowObject={activeRowObject}
        />
      </TableCell>
    </TableRowWrapper>
  );
};

export default TableRowComponent;
