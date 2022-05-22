import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';

import { RowCellProps } from '../RowCell';

const RowCell5Edit: (props: RowCellProps) => JSX.Element = (props: RowCellProps) => {
  return (
    <>
      <div>
        <Select
          value={props.data.value1}
          onChange={props.onChangeCellValue1}
          disabled={props.isValue1EditDisabled}
        >
          {props.options.value1.map((option) => {
            return <MenuItem value={option}>{option}</MenuItem>;
          })}
        </Select>
      </div>
      <div>
        <span>
          <Select
            value={props.data.value2}
            onChange={props.onChangeCellValue2}
            disabled={props.isValue2EditDisabled}
          >
            {props.options.value2.map((option) => {
              return <MenuItem value={option}>{option}</MenuItem>;
            })}
          </Select>
        </span>
        <span>
          <Select
            value={props.data.value3}
            onChange={props.onChangeCellValue3}
            disabled={props.isValue3EditDisabled}
          >
            {props.options.value3.map((option) => {
              return <MenuItem value={option}>{option}</MenuItem>;
            })}
          </Select>
        </span>
      </div>
    </>
  );
};

const RowCell5: React.FC = (props: RowCellProps) => {
  return (
    <TableCell>
      {props.isEditing ? (
        <RowCell5Edit {...props} />
      ) : (
        <>
          <div>{props.data.value1}</div>
          <div>
            <span>{props.data.value2}</span>
            <span>{props.data.value3}</span>
          </div>
        </>
      )}
    </TableCell>
  );
};

export default RowCell5;
