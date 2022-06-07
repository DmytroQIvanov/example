import * as React from "react";

// eslint-disable-next-line import/no-cycle
import {
  RowCell1,
  RowCell2,
  RowCell3,
  RowCell4,
  RowCell5,
  RowCell7,
  RowCell6,
} from "./RowCells";
import { RowCellData } from "./Type";

export interface RowCellProps {
  id: string;
  type: number;
  data: RowCellData;
  isEditing: boolean;
  variant: number;
  rows?: number;
  options: { [key: string]: string[] };
  isValue1EditDisabled?: boolean;
  isValue2EditDisabled?: boolean;
  isValue3EditDisabled?: boolean;
  disabled?: boolean;

  isEditDisabled: (key: string) => boolean;
  onChangeCellValue1?: (event: any) => void;
  onChangeCellValue2?: (event: any) => void;
  onChangeCellValue3?: (event: any) => void;

  ctaType?: string;
  ctaLabel?: string;
  onCtaClick: (event: any) => void;

  onClickEdit: () => void;
  onClickDelete: () => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  changeRowValue: (key: string, value: RowCellData) => void;
  changeAddress: (address: any) => void;
}

const RowCell = (props: RowCellProps) => {
  const rowCells = [RowCell1, RowCell2, RowCell3, RowCell4, RowCell5, RowCell6, RowCell7];
  const Cell = rowCells[props.type - 1];

  const onChangeCellValue = (
    key: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = {
      ...props.data,
      [key]: event.target.value,
    };

    // @ts-ignore
    props.changeRowValue(props.id, newValue);
  };

  const onAddressCellValue = (key: string, address: any) => {
    console.log([props.data, address]);
    const newValue = {
      ...props.data,
      [key]: address,
    };

    // @ts-ignore
    props.changeRowValue(props.id, newValue);
  };

  return (
    <Cell
      {...props}
      onChangeCellValue1={(event) => onChangeCellValue('value1', event)}
      onChangeCellValue2={(event) => onChangeCellValue('value2', event)}
      onChangeCellValue3={(event) => onChangeCellValue('value3', event)}
      changeAddress={(address: any) => {
        props.changeAddress ? props.changeAddress(address): onAddressCellValue('address', address)
      }}
      isValue1EditDisabled={props.isEditDisabled("value1")}
      isValue2EditDisabled={props.isEditDisabled("value2")}
      isValue3EditDisabled={props.isEditDisabled("value3")}
    />
  );
};

export default RowCell;
