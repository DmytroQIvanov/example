import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import useStyles from './styles';
import { RowCellVariantProps } from './Type';

const RowCell1: React.FC<RowCellVariantProps> = (
  props: RowCellVariantProps
) => {
  const classes = useStyles();

  const rowCell1Edit = () => {
    switch (props.data.variant) {
      case 1:
        return (
          <Select
            value={props.data.value1}
            onChange={props.onChangeCellValue1}
            disabled={props.isValue1EditDisabled}
            size="small"
            fullWidth
            rows={props.rows ? props.rows : 1}
          >
            {props.data.options.value1.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        );
      default:
        return (
          <TextField
            value={props.data.value1}
            onChange={props.onChangeCellValue1}
            variant="outlined"
            disabled={props.isValue1EditDisabled}
            size="small"
            fullWidth
            rows={props.rows ? props.rows : 1}
          />
        );
    }
  };

  return (
    <TableCell>
      <Box className={classes.wrapperSmall}>
        {props.isEditing ? <>{rowCell1Edit()}</> : <span className="table-cell-text">{props.data.value1}</span>}
      </Box>
    </TableCell>
  );
};

export default RowCell1;
