import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_OTHER_NAMES,
  INVALIDATE_OTHER_NAME,
  NAME_SOURCE_SUBTYPE_QUERY,
  NAME_SOURCE_TYPE_QUERY,
  VALIDATE_OTHER_NAME,
} from "../../../shemas/OtherNamesShemas";
import { useRouter } from "next/router";
import {
  CHANGE_DATE_LAST_KNOWN_VALID,
  HOME_ADDRESS_DMI_NULL,
} from "../../../shemas/HomeAddressShemas";

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
  const [invalidateFunction, { loading: invalidateLoading }] = useMutation(
    INVALIDATE_OTHER_NAME
  );
  const [validateFunction, { loading: validateLoading }] =
    useMutation(VALIDATE_OTHER_NAME);

  const [dmiNullFunction] = useMutation(HOME_ADDRESS_DMI_NULL);

  const [dlkvFunction, { loading: mutateLoading }] = useMutation(
    CHANGE_DATE_LAST_KNOWN_VALID
  );

  const { onCancel, summaryObject, onSave } = UseEditableTable({
    row,
    activeRowObject,
    onSaveWithProvidedState,
    onChangeWithProvidedState,
    onAddCancel,
    invalidateFunction,
    validateFunction,
    dmiNullFunction,
    // dlkvFunction,
  });

  const [nameSourceTypeArray, setNameSourceTypeArray] = useState<
    { label: string; id: string }[]
  >([]);
  const [nameSourceSubTypeArray, setNameSourceSubTypeArray] = useState<
    { label: string; id: string }[]
  >([]);
  const router = useRouter();

  const {
    data: nameSourceSubType,
    error,
    loading,
    fetchMore,
    refetch,
  } = useQuery(NAME_SOURCE_SUBTYPE_QUERY, {
    variables: {
      id: summaryObject.rowValues?.name_source_type?.name_source_type_id,
    },
    skip: !summaryObject.rowValues?.name_source_type?.name_source_type_id,
  });
  useEffect(() => {
    if (summaryObject.rowValues.name_source_type)
      refetch({
        id: summaryObject.rowValues?.name_source_type?.name_source_type_id,
      });
  }, [summaryObject.rowValues?.name_source_type]);

  const { data: nameSourceType } = useQuery(NAME_SOURCE_TYPE_QUERY);

  useEffect(() => {
    nameSourceType?.name_source_type &&
      setNameSourceTypeArray(
        nameSourceType.name_source_type.map((elem: any) => {
          return { label: elem.name_source_type, id: elem.name_source_type_id };
        })
      );
  }, [nameSourceType]);

  useEffect(() => {
    nameSourceSubType?.name_source_subtype &&
      setNameSourceSubTypeArray(
        nameSourceSubType.name_source_subtype.map((elem: any) => {
          return {
            id: elem.name_source_subtype_id,
            label: elem.name_source_subtype,
          };
        })
      );
  }, [nameSourceSubType]);

  return (
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"300px"}>
        {EditableBlock({
          ...summaryObject,
          name: "name_source_type.name_source_type",
          idName: "name_source_type.name_source_type_id",
          type: "dropdown",
          itemsArray: nameSourceTypeArray,
        })}
        {EditableBlock({
          ...summaryObject,
          name: "name_source_subtype.name_source_subtype",
          idName: "name_source_subtype.name_source_subtype_id",
          type: "dropdown",
          itemsArray: nameSourceSubTypeArray,
        })}
      </TableCell>

      <TableCell width={"180px"}>
        {EditableBlock({
          ...summaryObject,
          name: "first_name",
        })}
      </TableCell>
      <TableCell width={"180px"}>
        {EditableBlock({
          ...summaryObject,
          name: "middle_name",
        })}
      </TableCell>
      <TableCell width={"180px"}>
        {EditableBlock({ ...summaryObject, name: "last_name" })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({ ...summaryObject, name: "nick_name" })}
        {EditableBlock({ ...summaryObject, name: "suffix" })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...summaryObject,
          type: "date",
          name: "date_first_known_valid",
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
