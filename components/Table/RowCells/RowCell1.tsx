import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import * as React from "react";

import useStyles from "../../Tables/PersonHomeAddressTable/styles";
import { RowCellProps } from "../RowCell";

const RowCell1 = (props: RowCellProps) => {
  const classes = useStyles();

  const rowCell1Edit = () => {
    switch (props.variant) {
      case 2:
        return (
          <Select
            value={props.data.value1}
            onChange={(e) => {
              if (props.onChangeCellValue1) {
                props.onChangeCellValue1(e);
              }
            }}
            disabled={props.isValue1EditDisabled}
            size="small"
            fullWidth
            rows={props.rows ? props.rows : 1}
          >
            {props.options.value1 &&
              props.options.value1.map((option) => {
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
            onChange={(e) => {
              if (props.onChangeCellValue1) {
                props.onChangeCellValue1(e);
              }
            }}
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
      <Box>
        {props.isEditing ? (
          <>{rowCell1Edit()}</>
        ) : (
          <span className="table-cell-text">{props.data.value1}</span>
        )}
      </Box>
    </TableCell>
  );
};

export default RowCell1;
