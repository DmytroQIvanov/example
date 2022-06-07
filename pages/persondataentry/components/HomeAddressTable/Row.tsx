import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Key } from "react";
import { useState } from "react";

import RowCell from "../../../../components/Table/RowCell";
import { RowCellData, RowData } from "../../../../components/Table/Type";
import {
  getCtaLabel,
  getCtaType,
  getEditDisabledValues,
  getOptions,
  getType,
  getVariant,
} from "../../../../components/Table/Utils";
import { HeaderData } from "./Type";

interface RowProps {
  data: RowData;
  updateData?: (data: any) => void;
  rowDelete?: () => void;
  id?: string;
}

const Row: React.FC<RowProps> = (props: { data: any; updateData: (arg0: any) => any; id: Key | null | undefined; rowDelete: any; }) => {
  const [data, setData] = useState<RowData>(props.data);
  const [initialData, setInitialData] = useState<RowData>(props.data);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onClickEdit = () => {};

  const onClickSave = () => {
    setIsEditing(false);

    setInitialData(data);
  };

  const onClickCancel = () => {
    setIsEditing(false);

    setData(initialData);
  };

  const changeRowValue = (key: string, value: RowCellData) => {
    const newData = {
      ...data,
      [key]: value,
    };

    setData(newData);
    props.updateData && props.updateData(newData);
  };

  const changeAddress = (address: any) => {
    const newData: any = {
      ...data,
      "home-address": { value1: address.full },
      source: { value1: address.source },
      comments: { value1: address.comments },
    };
    newData.options = { ...newData.options, address: address };
    setData(newData);
    props.updateData && props.updateData(newData);
  };

  const isEditDisabled = (headerKey: string, valueKey: string) => {
    return getEditDisabledValues(headerKey)?.includes(valueKey);
  };

  const onCtaClick = (headerKey: string, ctaType: string, event: any) => {
    switch (ctaType) {
      case "switch":
      case "checkbox": {
        const newData = { ...data };
        
        newData[headerKey].ctaChecked = event.target.checked;

        console.log(newData);

        setData(newData);
        break;
      }
      default:
        console.log("-------button clicked-------", headerKey);
        break;
    }
  };

  return (
    <TableRow
      hover
      key={props.id}
      className={data["marked-invalid"].ctaChecked ? "disabled" : ""}
    >
      {Object.keys(data)
        .filter((key) => key !== "id")
        .map((key) => {
          return (
            <RowCell
              id={key}
              key={key}
              type={getType(HeaderData, key)}
              variant={getVariant(HeaderData, key)}
              options={getOptions(HeaderData, key)}
              isEditDisabled={(valueKey: string) => isEditDisabled(key, valueKey)}
              data={data[key]}
              isEditing={isEditing}
              ctaType={getCtaType(HeaderData, key)}
              ctaLabel={getCtaLabel(HeaderData, key)}
              onCtaClick={(event: any) =>
                onCtaClick(key, getCtaType(HeaderData, key), event)
              }
              onClickEdit={onClickEdit}
              onClickDelete={props.rowDelete}
              onClickSave={onClickSave}
              onClickCancel={onClickCancel}
              changeRowValue={changeRowValue}
              changeAddress={changeAddress}
              disabled={data["marked-invalid"].ctaChecked}
            />
          );
        })}
    </TableRow>
  );
};

export default Row;
