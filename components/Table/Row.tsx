import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useState, useEffect } from 'react';

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
import { HeaderData } from './Type';

interface RowProps {
  id: string,
  data: RowData;
  headers: any;
  saveRow ?: (data: any) => void;
  updateData ?: (data: any) => void;
  deleteRow ?: (data: any) => void;
}

const Row = (props: RowProps) => {
  const [data, setData] = useState<any>(props.data);
  const [initialData, setInitialData] = useState<RowData>(props.data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [headers, setHeaders] = useState(props.headers);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const onClickEdit = () => {
    setIsEditing(true);
  };

  const onClickDelete = () => {
    if (props.deleteRow) {
      props.deleteRow(data);
    }
  };

  const onClickSave = () => {
    setIsEditing(false);

    setInitialData(data);

    if (props.saveRow) {
      props.saveRow(data);
    }
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

  const changeAddress = (address: any) => {
    const newData = {
      ...data,
      'home-address': {value1: address.full},
      'source': {value1: address.source},
      'comments': {value1: address.comments},
    };
    newData.options = { ...newData.options, address: address };
    setData(newData);
    if (props.updateData) {
      props.updateData(newData);
    }
  }

  const isEditDisabled = (headerKey: string, valueKey: string) => {
    return getEditDisabledValues(headers, headerKey)?.includes(valueKey);
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
        break;
    }
  };

  return (
    <TableRow hover key={props.id}>
      {Object.keys(data).filter(key => key !== 'id').map((key) => {
        return (
          <RowCell
            id={key}
            key={key}
            type={getType(headers, key)}
            variant={getVariant(headers, key)}
            options={getOptions(headers, key)}
            isEditDisabled={(valueKey) => isEditDisabled(key, valueKey)}
            data={data[key]}
            isEditing={data['id'] ? isEditing : true}
            ctaType={getCtaType(headers, key)}
            ctaLabel={getCtaLabel(headers, key)}
            onCtaClick={(event) => onCtaClick(key, getCtaType(headers, key), event)}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            onClickSave={onClickSave}
            onClickCancel={onClickCancel}
            changeRowValue={changeRowValue}
            changeAddress={changeAddress}
          />
        );
      })}
    </TableRow>
  );
};

export default Row;
