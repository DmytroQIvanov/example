import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { RowCellProps } from '../RowCell';

const RowCell2EditDefault: (props: RowCellProps) => JSX.Element = (props: RowCellProps) => {
  return (
    <>
      <div>
        <TextField
          value={props.data.value1}
          onChange={props.onChangeCellValue1}
          variant="outlined"
          disabled={props.isValue1EditDisabled}
        />
      </div>
      <div>
        <TextField
          value={props.data.value2}
          onChange={props.onChangeCellValue2}
          variant="outlined"
          disabled={props.isValue2EditDisabled}
        />
      </div>
    </>
  );
};

const RowCell2EditVariant1: React.FC = (props: RowCellProps) => {
  return (
    <>
      <div>
        <TextField
          value={props.data.value1}
          onChange={props.onChangeCellValue1}
          variant="outlined"
          disabled={props.isValue1EditDisabled}
        />
      </div>
      <div>
        <Select
          value={props.data.value2}
          onChange={props.onChangeCellValue2}
          disabled={props.isValue2EditDisabled}
        >
          {props.options.value2.map((option) => {
            return <MenuItem value={option}>{option}</MenuItem>;
          })}
        </Select>
      </div>
    </>
  );
};

const RowCell2EditVariant2: React.FC = (props: RowCellProps) => {
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
        <TextField
          value={props.data.value2}
          onChange={props.onChangeCellValue2}
          variant="outlined"
          disabled={props.isValue2EditDisabled}
        />
      </div>
    </>
  );
};

const RowCell2EditVariant3: React.FC = (props: RowCellProps) => {
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
        <Select
          value={props.data.value2}
          onChange={props.onChangeCellValue2}
          disabled={props.isValue2EditDisabled}
        >
          {props.options.value2.map((option) => {
            return <MenuItem value={option}>{option}</MenuItem>;
          })}
        </Select>
      </div>
    </>
  );
};

const RowCell2Edit: React.FC = (props: RowCellProps) => {
  switch (props.variant) {
    case 1:
      return <RowCell2EditVariant1 {...props} />;
    case 2:
      return <RowCell2EditVariant2 {...props} />;
    case 3:
      return <RowCell2EditVariant3 {...props} />;
    default:
      return <RowCell2EditDefault {...props} />;
  }
};

const RowCell2: React.FC = (props: RowCellProps) => {
  return (
    <TableCell>
      {props.isEditing ? (
        <RowCell2Edit {...props} />
      ) : (
        <>
          <div><span className="table-cell-text">{props.data.value1}</span></div>
          <div><span className="table-cell-text">{props.data.value2}</span></div>
        </>
      )}
    </TableCell>
  );
};

export default RowCell2;
