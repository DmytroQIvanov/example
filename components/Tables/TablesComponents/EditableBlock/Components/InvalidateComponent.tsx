import { IActiveRowObject } from "../../Interfaces/TableWrapperInterfaces";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export const InvalidateComponent = ({
  rowValues,
  validateState,
  changeValidateState,
  activeRowObject,
}: {
  rowValues: any;
  validateState: boolean;
  changeValidateState: () => void;
  activeRowObject: IActiveRowObject;
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControlLabel
        value="start"
        control={
          <Checkbox
            onChange={() => changeValidateState()}
            checked={
              activeRowObject.activeRow.number == rowValues.id &&
              activeRowObject.activeRow.state !== "default"
                ? validateState
                : rowValues["validateState"]
            }
            disabled={rowValues["validateState"]}
          />
        }
        label={"Invalidate"}
        labelPlacement="start"
        sx={{ ml: "0" }}
      />
    </Box>
  );
};
