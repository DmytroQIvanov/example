import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { RowCellProps } from '../RowCell';
import CallToActionCell from './CallToActionCell';

const RowCell3EditDefault = (props: RowCellProps) => {
  return (
    <TextField
      value={props.data.value1}
      onChange={props.onChangeCellValue1}
      variant="outlined"
      disabled={props.isValue1EditDisabled}
    />
  );
};

const RowCell3Edit = (props: RowCellProps) => {
  return <RowCell3EditDefault {...props} />;
};

const RowCell3 = (props: RowCellProps) => {
  return (
    <TableCell>
      <div>
        {props.isEditing ? (
          <RowCell3Edit {...props} />
        ) : (
          <span className="table-cell-text">{props.data.value1}</span>
        )}
      </div>
      <div>
        <CallToActionCell
          disabled={props.disabled}
          type={props.ctaType ? props.ctaType : ''}
          label={props.ctaLabel ? props.ctaLabel : ''}
          checked={props.data.ctaChecked}
          onClick={props.onCtaClick}
        />
      </div>
    </TableCell>
  );
};

export default RowCell3;
