import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { propsBlockWithState } from "../interfaces";

interface extraProps extends propsBlockWithState {
  inputParams: any;
  disabledState: boolean;
  styles: any;
}
export const Dropdown = ({
  itemsArray,
  rowValues,
  width,
  inputParams,
  disabledState,
  idName,
  name,
  handleChangeArray,
  handleChange,
  styles,
}: extraProps) => {
  if (itemsArray && itemsArray.length >= 1) {
    const dropDownFunction = (inputName: string | undefined) => {
      if (!inputName) return;
      const result = inputName?.toString().split(".");
      if (result?.length === 2) {
        return rowValues[result[0]][result[1]];
      } else if (result?.length === 3) {
        return rowValues[result[0]][result[1]]?.[result[2]];
      } else {
        return rowValues[inputName];
      }
    };
    return (
      <Autocomplete
        disablePortal
        options={itemsArray && itemsArray}
        fullWidth={width ? true : false}
        {...inputParams}
        disabled={disabledState}
        value={{
          id: dropDownFunction(idName),
          label: dropDownFunction(name),
        }}
        onChange={(
          event: any,
          newValue: { label: string | number; id: number | string } | null
        ) => {
          if (!newValue) return;
          if (idName) {
            handleChangeArray([
              { name, value: newValue.label },
              { name: idName, value: newValue.id },
            ]);
          } else {
            handleChange(name, newValue.id);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            style={styles}
            size={"small"}
            label={""}
            name={name}
          />
        )}
      />
    );
  } else {
    return <></>;
  }
};

export default Dropdown;
