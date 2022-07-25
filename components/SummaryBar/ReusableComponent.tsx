import React, { useEffect } from "react";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";

// const handleChange = (
//   name: string,
//   value: string | number | boolean | Date
// ) => {
//   setEditableRowValues((prevState: any) => {
//     return {
//       ...prevState,
//
//       ...func2({ value, name, prevState }),
//     };
//   });
// };
const ReusableComponent: React.FC<{
  editStatus: number;
  personDataState: any;
  editableState: any;
  handleChangeEvent: (event: React.ChangeEvent<any>) => void;
  name: string;
  idName?: string;
  loading: boolean;
  type?: "textField" | "selectableList";
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
      alert(editableState?.[result[0]]?.[result[1]]);
      return editableState?.[result[0]]?.[result[1]];
    } else if (result?.length === 3) {
      return editableState?.[result[0]]?.[result[1]]?.[result[2]];
    } else {
      return editableState[inputName];
    }
  };
  let data = dropDownFunction(name);
  let component;
  // useEffect(() => {
  //   if (!dropDownFunction(name)) {
  //     handleChange(name, "");
  // alert();
  // }
  // if (idName && !dropDownFunction(idName)) {
  //   handleChange(idName, "");
  // }
  // }, [name, idName]);
  console.log(personDataState);
  console.log(name, idName);
  // console.log(name,idName);
  switch (type) {
    case "textField":
      component = (
        <TextField
          defaultValue={name && dropDownFunction(name)}
          variant="outlined"
          onChange={handleChangeEvent}
          name={name}
          value={dropDownFunction(name)}
          size={"small"}
        />
      );
      break;
    case "selectableList":
      if (!list) return <></>;
      // if (list) return <>{idName}</>;
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
          value={{
            id: dropDownFunction(idName) || "",
            label: dropDownFunction(name) || "",
          }}
          onChange={(
            event: any,
            newValue: { label: string | number; id: number | string } | null
          ) => {
            // if (!newValue || !name) return;
            // if (idName) {
            console.log(newValue);
            handleChangeArray([
              { name, value: newValue.label },
              { name: idName, value: newValue.id },
            ]);
            // } else {
            //   handleChange(name, newValue.id);
            // }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              // style={styles}
              size={"small"}
              label={""}
              name={name}
            />
          )}
        />
        // <FormControl fullWidth size={"small"}>
        //   <InputLabel id="demo-simple-select-label">
        //     {/*Name Source Type*/}
        //   </InputLabel>
        //   <Select
        //     onChange={(event, child) =>
        //       handleChange("nameSourceType", event.target.value)
        //     }
        //     name={"nameSourceType"}
        //     value={editableState["nameSourceType"]}
        //   >
        //     <MenuItem value={10}>Ten</MenuItem>
        //     <MenuItem value={20}>Twenty</MenuItem>
        //     <MenuItem value={30}>Thirty</MenuItem>
        //   </Select>
        // </FormControl>
      );
      break;
  }

  return (
    <div>
      {editStatus && editable ? (
        component
      ) : (
        <Box sx={{ ml: "10px" }}>
          {data ? (
            `
            ${data} ${coma ? "," : ""}`
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
