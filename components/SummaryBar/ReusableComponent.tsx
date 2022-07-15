import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";

const ReusableComponent: React.FC<{
  editStatus: number;
  personDataState: any;
  editableState: any;
  handleChangeEvent: (event: React.ChangeEvent<any>) => void;
  name: string;
  loading: boolean;
  type?: "textField" | "selectableList";
  coma?: boolean;
  handleChange: (name: string, text: string | number) => void;
  editable?: boolean;
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
}) => {
  let data = personDataState[name];
  let component;
  switch (type) {
    case "textField":
      component = (
        <TextField
          defaultValue={personDataState[name] && personDataState[name]}
          variant="outlined"
          onChange={handleChangeEvent}
          name={name}
          value={editableState[name]}
          size={"small"}
          error={true}
        />
      );
      break;
    case "selectableList":
      component = (
        <FormControl fullWidth size={"small"}>
          <InputLabel id="demo-simple-select-label">
            {/*Name Source Type*/}
          </InputLabel>
          <Select
            onChange={(event, child) =>
              handleChange("nameSourceType", event.target.value)
            }
            name={"nameSourceType"}
            value={editableState["nameSourceType"]}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
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
