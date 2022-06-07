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
          onChange={(e) => {
              if (props.onChangeCellValue1) {
                props.onChangeCellValue1(e);
              }
            }
          }
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
            onChange={(e) => {
              if (props.onChangeCellValue2) {
                props.onChangeCellValue2(e);
              }
            }}
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

const RowCell5 = (props: RowCellProps) => {
  return (
    <TableCell>
      {props.isEditing ? (
        <RowCell5Edit {...props} />
      ) : (
        <>
          <div><span className="table-cell-text">{props.data.value1}</span></div>
          <div>
            <span className="table-cell-text">{props.data.value2}</span>
            <span className="table-cell-text">{props.data.value3}</span>
          </div>
        </>
      )}
    </TableCell>
  );
};

export default RowCell5;
