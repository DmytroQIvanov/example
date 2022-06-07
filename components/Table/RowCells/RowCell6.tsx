import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TableCell from '@mui/material/TableCell';
import * as React from 'react';

import { RowCellProps } from '../RowCell';

const RowCell6 = (props: RowCellProps) => {
  return (
    <TableCell>
      {props.isEditing ? (
        <>
          <SaveIcon onClick={props.onClickSave} />
          <CancelIcon onClick={props.onClickCancel} />
        </>
      ) : (
        <>
          <EditIcon onClick={props.onClickEdit} />
          <DeleteIcon onClick={props.onClickDelete} />
        </>
      )}
    </TableCell>
  );
};

export default RowCell6;
