import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import * as React from 'react';

import { RowCellProps } from '../RowCell';
import AddressEditModal from './AddressEditModal';

const RowCell7: React.FC = (props: RowCellProps) => {
  const [open, setOpen] = React.useState(false);

  const onEditAddress = () => {
    setOpen(true);
    props.onCtaClick();
  }

  return (
    <TableCell>
      <div>
        <AddressEditModal
          open={open}
          title={`Address Record <${props.id}>`}
          handleClose={() => setOpen(false)}
          onChangeAddress={(address) => props.onChangeAddress(address)}
        />
      </div>
      <div>
        { props.data.address.street }
      </div>
      <div>
        <Button variant="outlined" onClick={onEditAddress}>
          {props.ctaLabel}
        </Button>
      </div>
    </TableCell>
  );
};

export default RowCell7;
