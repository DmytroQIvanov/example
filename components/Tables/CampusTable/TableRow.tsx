import React, { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { Box } from "@mui/material";
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import TableRowWrapper from "../TablesComponents/TableRowWrapper";

//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";
import { ITableRowComponent } from "../TablesComponents/Interfaces/ITableRowComponent";
import { INFORMATION_SOURCE_QUERY } from "../../../shemas/CommonTableShemas";
import { useMutation, useQuery } from "@apollo/client";
import {
  AREA_QUERY,
  CAMPUS_LIST_QUERY,
  INVALIDATE_CAMPUS_TABLE,
  SUPER_AREA_QUERY,
  VALIDATE_CAMPUS_TABLE,
} from "../../../shemas/CampusShemas";

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
    INVALIDATE_CAMPUS_TABLE
  );
  const [validateFunction, { loading: validateLoading }] = useMutation(
    VALIDATE_CAMPUS_TABLE
  );
  const { onCancel, summaryObject, onSave } = UseEditableTable({
    row,
    activeRowObject,
    onSaveWithProvidedState,
    onChangeWithProvidedState,
    onAddCancel,
    invalidateFunction,
    validateFunction,
  });

  const [campusArray, setCampusArray] = useState<
    { label: string; id: string }[]
  >([]);

  const [informationSourceArray, setInformationSourceArray] = useState<any[]>(
    []
  );
  const [superAreaArray, setSuperAreaArray] = useState<
    { label: string; id: string }[]
  >([]);
  const [areaArray, setAreaArray] = useState<{ label: string; id: string }[]>(
    []
  );

  const { data: campusData } = useQuery(CAMPUS_LIST_QUERY);

  useEffect(() => {
    campusData?.campus &&
      setCampusArray(
        campusData.campus.map((elem: any) => {
          return {
            id: elem.campus_id,
            label: elem.campus_name,
          };
        })
      );
  }, [campusData]);

  const { data: informationSourceData } = useQuery(INFORMATION_SOURCE_QUERY);
  useEffect(() => {
    informationSourceData?.information_source_type &&
      setInformationSourceArray(
        informationSourceData.information_source_type.map((elem: any) => {
          return {
            id: elem.information_source_type_id,
            label: elem.information_source_type,
          };
        })
      );
  }, [informationSourceData]);

  const { data: superAreaData } = useQuery(SUPER_AREA_QUERY, {
    variables: { campus: summaryObject.rowValues?.campus?.campus_id },
    skip: !summaryObject.rowValues?.campus?.campus_id,
  });

  useEffect(() => {
    superAreaData?.super_area &&
      setSuperAreaArray(
        superAreaData.super_area.map((elem: any) => {
          return {
            id: elem.super_area_id,
            label: elem.super_area,
          };
        })
      );
  }, [superAreaData]);

  const { data: areaData, error: error1 } = useQuery(AREA_QUERY, {
    variables: {
      campus: summaryObject.rowValues?.campus?.campus_id,
      superarea: summaryObject.rowValues?.area?.super_area?.super_area_id,
    },
    skip:
      !summaryObject.rowValues?.campus?.campus_id ||
      !summaryObject.rowValues?.area?.super_area?.super_area_id,
  });

  useEffect(() => {
    areaData?.area &&
      setAreaArray(
        areaData.area.map((elem: any) => {
          return {
            id: elem.area_id,
            label: elem.area,
          };
        })
      );
  }, [areaData]);

  return (
    <TableRowWrapper summaryObject={summaryObject}>
      <TableCell component="th" scope="row" width={"300px"}>
        <Box>
          {EditableBlock({
            ...summaryObject,
            name: "campus.campus_name",
            idName: "campus.campus_id",
            type: "dropdown",
            itemsArray: campusArray,
          })}
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" width={"300px"}>
        {EditableBlock({
          ...summaryObject,
          name: "area.super_area.super_area",
          idName: "area.super_area.super_area_id",
          type: "dropdown",
          itemsArray: superAreaArray,
        })}
        <Box sx={{ mt: "20px" }}>
          {EditableBlock({
            ...summaryObject,
            name: "area.area",
            idName: "area.area_id",
            type: "dropdown",
            itemsArray: areaArray,
          })}
        </Box>
      </TableCell>
      <TableCell width={"150px"}>
        {EditableBlock({
          ...summaryObject,
          name: "turfid",
        })}
      </TableCell>
      <TableCell width={"220px"}>
        {EditableBlock({
          ...summaryObject,
          name: "information_source_type.information_source_type",
          idName: "information_source_type.information_source_type_id",
          type: "dropdown",
          itemsArray: informationSourceArray,
        })}
      </TableCell>

      <TableCell width={"100px"}>
        {EditableBlock({
          ...summaryObject,
          name: "supress",
          type: "checkBox",
          checkBox: {
            textVariants: { trueVariant: "Yes", falseVariant: "No" },
          },
        })}
      </TableCell>

      <TableCell width={"100px"}>
        {EditableBlock({
          ...summaryObject,
          name: "is_pi",
          type: "checkBox",
          checkBox: {
            textVariants: { trueVariant: "Yes", falseVariant: "No" },
          },
        })}
      </TableCell>

      <TableCell width={"400px"}>
        {EditableBlock({
          ...summaryObject,
          name: "summary",
          multiline: 6,
          width: 100,
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
      <TableCell width={"220px"}>
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
