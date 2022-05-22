import TableCell from '@mui/material/TableCell';
import * as React from 'react';

import { RowCellProps } from '../RowCell';
import CallToActionCell from './CallToActionCell';

const RowCell4: React.FC = (props: RowCellProps) => {
  return (
    <TableCell>
      <CallToActionCell
        type={props.ctaType}
        label={props.ctaLabel}
        checked={props.data.ctaChecked}
        onClick={props.onCtaClick}
      />
    </TableCell>
  );
};

export default RowCell4;
