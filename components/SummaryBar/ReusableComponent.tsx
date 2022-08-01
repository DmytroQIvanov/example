import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { dateOptions } from "../Tables/TablesComponents/EditableBlock/Components/dateOptions";

const ReusableComponent: React.FC<{
  editStatus: number;
  personDataState: any;
  editableState: any;
  handleChangeEvent: (event: React.ChangeEvent<any>) => void;
  name: string;
  idName?: string;
  loading: boolean;
  type?: "textField" | "selectableList" | "date";
  coma?: boolean;
  handleChange: (name: string, text: string | number) => void;
  editable?: boolean;
  list?: { label: string; id: string }[];
  handleChangeArray: (any: any) => any;
}> = ({
  personDataState,
  editStatus,
  handleChangeEvent,
  editableState,
  name,
  handleChange,
  type = "textField",
  loading,
  coma,
  editable = true,
  list,
  idName,
  handleChangeArray,
}) => {
  const dropDownFunction = (inputName: string | undefined) => {
    if (!inputName) return;
    const result = inputName?.toString().split(".");
    if (result?.length === 2) {
      return personDataState?.[result[0]]?.[result[1]];
    } else if (result?.length === 3) {
      return personDataState?.[result[0]]?.[result[1]]?.[result[2]];
    } else {
      return personDataState[inputName];
    }
  };
  const dropDownFunction2 = (inputName: string | undefined) => {
    if (!inputName) return;
    const result = inputName?.toString().split(".");
    if (result?.length === 2) {
      return editableState?.[result[0]]?.[result[1]];
    } else if (result?.length === 3) {
      return editableState?.[result[0]]?.[result[1]]?.[result[2]];
    } else {
      return editableState[inputName];
    }
  };
  let data = dropDownFunction(name);
  let component;
  let textField = data;
  let styles = !editable ? { backgroundColor: "#C3DBFF" } : {};

  switch (type) {
    case "textField":
      component = (
        <TextField
          style={styles}
          defaultValue={name && dropDownFunction(name)}
          variant="outlined"
          onChange={handleChangeEvent}
          name={name}
          value={dropDownFunction(name)}
          size={"small"}
          disabled={!editable}
        />
      );
      break;
    case "selectableList":
      if (!list) return <></>;
      component = (
        <Autocomplete
          disablePortal
          options={list}
          // options={list && list}
          // fullWidth={width ? true : false}
          // disabled={disabledState}
          // value={{
          //   id: dropDownFunction(idName) || null,
          //   label: dropDownFunction(name) || null,
          // }}
          value={
            dropDownFunction(idName) && dropDownFunction(name)
              ? {
                  id: dropDownFunction(idName),
                  label: dropDownFunction(name),
                }
              : null
          }
          onChange={(
            event: any,
            newValue: { label: string | number; id: number | string } | null
          ) => {
            event.preventDefault();
            if (!newValue || !name) {
              handleChangeArray([
                { name, value: null },
                { name: idName, value: null },
              ]);
              return;
            }
            handleChangeArray([
              { name, value: newValue.label },
              { name: idName, value: newValue.id },
            ]);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size={"small"}
              label={""}
              name={name}
              style={styles}
              disabled={!editable}
            />
          )}
        />
      );
      break;

    case "date":
      component = (
        <TextField
          // defaultValue={name && dropDownFunction(name)}
          variant="outlined"
          onChange={handleChangeEvent}
          name={name}
          // value={new Date(dropDownFunction(name)).toString()}
          size={"small"}
          style={styles}
          disabled={!editable}
        />
      );
      break;
  }
  switch (type) {
    case "date":
      textField = new Date(textField).toLocaleString("en-US", dateOptions);
      break;
  }

  return (
    <div>
      {/*{editStatus && editable ? (*/}
      {editStatus ? (
        component
      ) : (
        <Box sx={{ ml: "10px" }}>
          {textField ? (
            `
            ${textField} ${coma ? "," : ""}`
          ) : loading ? (
            "..."
          ) : (
            <Box sx={{ visibility: "hidden" }}>?</Box>
          )}
        </Box>
      )}
    </div>
  );
};

export default ReusableComponent;
