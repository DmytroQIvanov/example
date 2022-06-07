import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import React, { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { RowCellProps } from '../RowCell';
import AddressEditModal from './AddressEditModal';

const RowCell7 = (props: RowCellProps) => {
  const [open, setOpen] = React.useState(false);
  const [datemarkedinvalid, setDatemarkedinvalid] = React.useState(false);

  const onEditAddress = (e: any) => {
    setOpen(true);
    props.onCtaClick(e);
  }

  return (
    <TableCell>
      <div>
        <AddressEditModal
          open={open}
          data={props.data}
          title={`Address Record`}
          handleClose={() => setOpen(false)}
          onChangeAddress={(address: any) => props.changeAddress(address)}
        />
      </div>
      <div>
        <>
          {datemarkedinvalid &&
            <AssignmentIcon /> }
          <EditIcon onClick={(e) => onEditAddress(e)} />
          <DeleteIcon onClick={props.onClickDelete} />
        </>
      </div>
    </TableCell>
  );
};

export default RowCell7;
