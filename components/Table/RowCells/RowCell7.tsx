import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import React, { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { RowCellProps } from '../RowCell';
import AddressEditModal from './AddressEditModal';

const RowCell7: React.FC = (props: RowCellProps) => {
  const [open, setOpen] = React.useState(false);
  const [datemarkedinvalid, setDatemarkedinvalid] = React.useState(false);

  const onEditAddress = () => {
    setOpen(true);
    props.onCtaClick();
  }

  return (
    <TableCell>
      <div>
        <AddressEditModal
          open={open}
          data={props.data}
          title={`Address Record`}
          handleClose={() => setOpen(false)}
          onChangeAddress={(address) => props.onChangeAddress(address)}
        />
      </div>
      <div>
        <>
          {datemarkedinvalid &&
            <AssignmentIcon /> }
          <EditIcon onClick={onEditAddress} />
          <DeleteIcon onClick={props.onClickDelete} />
        </>
      </div>
    </TableCell>
  );
};

export default RowCell7;
