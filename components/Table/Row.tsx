import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useState } from 'react';

import RowCell from './RowCell';
import { RowCellData, RowData } from './Type';
import {
  getCtaLabel,
  getCtaType,
  getEditDisabledValues,
  getOptions,
  getType,
  getVariant,
} from './Utils';

interface RowProps {
  data: RowData;
}

const Row: React.FC = (props: RowProps) => {
  const [data, setData] = useState<RowData>(props.data);
  const [initialData, setInitialData] = useState<RowData>(props.data);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {};

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
  };

  const isEditDisabled: boolean = (headerKey: string, valueKey: string) => {
    return getEditDisabledValues(headerKey)?.includes(valueKey);
  };

  const onCtaClick = (headerKey: string, ctaType: string, event: any) => {
    switch (ctaType) {
      case 'switch':
      case 'checkbox': {
        const newData = { ...data };
        newData[headerKey].ctaChecked = event.target.checked;

        setData(newData);
        break;
      }
      default:
        console.log('-------button clicked-------', headerKey);
        break;
    }
  };

  return (
    <TableRow hover key={props.id}>
      {Object.keys(data).map((key) => {
        return (
          <RowCell
            id={key}
            key={key}
            type={getType(key)}
            variant={getVariant(key)}
            options={getOptions(key)}
            isEditDisabled={(valueKey) => isEditDisabled(key, valueKey)}
            data={data[key]}
            isEditing={isEditing}
            ctaType={getCtaType(key)}
            ctaLabel={getCtaLabel(key)}
            onCtaClick={(event) => onCtaClick(key, getCtaType(key), event)}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            onClickSave={onClickSave}
            onClickCancel={onClickCancel}
            changeRowValue={changeRowValue}
          />
        );
      })}
    </TableRow>
  );
};

export default Row;
