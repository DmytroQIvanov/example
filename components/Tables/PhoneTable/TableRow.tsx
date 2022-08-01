import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import TableRow from "@material-ui/core/TableRow";

//STYLES
import EditableBlock from "../TablesComponents/EditableBlock";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//ICONS
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";
import { useMutation, useQuery } from "@apollo/client";
import {
  DNC,
  INVALIDATE_PERSON_PHONE,
  PHONE_TYPE_DATA,
  REMOVE_DNC,
  VALIDATE_PERSON_PHONE,
} from "../../../schemas/PhonesSchemas";
import { UseGetInformationSourceType } from "../../../hooks/UseGetInformationSourceType";

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
  const [invalidateFunction] = useMutation(INVALIDATE_PERSON_PHONE);
  const [validateFunction] = useMutation(VALIDATE_PERSON_PHONE);

  const [dncFunction] = useMutation(DNC);
  const [remove_dncFunction] = useMutation(REMOVE_DNC);
  const { data: phoneTypeArray } = useQuery(PHONE_TYPE_DATA);

  const { onCancel, summaryObject, onSave } = UseEditableTable({
    row,
    activeRowObject,
    onSaveWithProvidedState,
    onChangeWithProvidedState,
    onAddCancel,
    validateFunction,
    invalidateFunction,
  });

  const [dncBoolean, setDncBoolean] = useState(
    Boolean(summaryObject.rowValues?.date_marked_do_not_call)
  );

  useEffect(() => {
    if (Boolean(summaryObject.rowValues.date_marked_do_not_call)) {
      setDncBoolean(true);
    } else {
      setDncBoolean(false);
    }
  }, [summaryObject.rowValues.date_marked_do_not_call]);

  useEffect(() => {
    summaryObject.handleChange("dncBoolean", dncBoolean || "");
  }, [dncBoolean]);

  const [phoneTypeList, setPhoneTypeList] = useState<
    { label: string; id: string }[]
  >([]);
  useEffect(() => {
    phoneTypeArray?.phone_type &&
      setPhoneTypeList(
        phoneTypeArray.phone_type.map((elem: any) => {
          return {
            id: elem.phone_type_id,
            label: elem.phone_type,
          };
        })
      );
  }, [phoneTypeArray?.phone_type]);

  const { informationSourceArray } = UseGetInformationSourceType();

  return (
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"270px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "phone_number",
          })}
        </Box>
      </TableCell>
      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "phone_type.phone_type",
          idName: "phone_type.phone_type_id",
          type: "dropdown",
          itemsArray: phoneTypeList,
        })}
      </TableCell>
      <TableCell width={"250px"}>
        {EditableBlock({
          ...summaryObject,
          name: "information_source_type.information_source_type",
          idName: "information_source_type.information_source_type_id",
          type: "dropdown",
          itemsArray: informationSourceArray,
        })}
      </TableCell>
      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_marked_do_not_call",
          type: "date",
          checkBox: {
            value: dncBoolean,
            label: "Do Not Call",
            onClick: () => {
              const date = new Date();
              let data;
              if (!dncBoolean) {
                summaryObject.rowValues?.person_phone_id &&
                  (data = dncFunction({
                    variables: {
                      id: summaryObject.rowValues.person_phone_id,
                      date,
                    },
                  }));
                setDncBoolean(true);
              } else {
                summaryObject.rowValues?.person_phone_id &&
                  (data = remove_dncFunction({
                    variables: {
                      id: summaryObject.rowValues.person_phone_id,
                      date,
                    },
                  }));
                setDncBoolean(false);
              }
              Promise.all([data]).then(() => {
                refetch && refetch();
              });
            },
          },
        })}
      </TableCell>
      <TableCell width={"400px"}>
        {EditableBlock({
          ...summaryObject,
          name: "comments",
          multiline: 6,
          width: 100,
        })}
      </TableCell>
      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_first_known_valid",
          type: "date",
        })}
      </TableCell>
      <TableCell width={"200px"}>
        {EditableBlock({
          ...summaryObject,
          name: "date_last_known_valid",
          type: "date",
        })}
        {EditableBlock({ ...summaryObject, type: "validate" })}
      </TableCell>
      <TableCell width={"200px"}>
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
