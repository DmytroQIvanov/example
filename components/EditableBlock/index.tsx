import React, { CSSProperties } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface propsBlockWithState {
  title?: string;
  name: string;
  disabled?: boolean;
  width?: number;
  itemsArray?: { label: string }[];
  type?: "textField" | "dropdown";
  multiline?: number;
  editStateBoolean: boolean;
  summaryState: { [index: string]: any };
  titleVisibly?: boolean;
  handleChange: Function;
  style?: CSSProperties;
  className?: string;
  checkBox?: { onChange: Function; label: string; value: boolean };
  validate?: {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    label?: string;
  };
  handleChangeEvent: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
}

const EditableBlock: React.FC<propsBlockWithState> = ({
  title,
  name,
  width,
  type = "textField",
  multiline,
  itemsArray,
  summaryState,
  editStateBoolean,
  handleChange,
  handleChangeEvent,
  titleVisibly = true,
  checkBox,
  validate,

  ...inputParams
}) => {
  return (
    <Box>
      <Grid container direction="column" position="relative">
        <Grid item>
          {title && (
            <>
              {!titleVisibly ? (
                editStateBoolean && (
                  <Typography color={"gray"}>{title}</Typography>
                )
              ) : (
                <Typography color={"gray"}>{title}</Typography>
              )}
            </>
          )}
        </Grid>
        <Grid item width={width && `${width}%`}>
          {editStateBoolean ? (
            type === "dropdown" && itemsArray && itemsArray.length >= 1 ? (
              <Autocomplete
                disablePortal
                options={itemsArray && itemsArray}
                fullWidth={width ? true : false}
                {...inputParams}
                value={{ label: summaryState[name] }}
                onChange={(
                  event: any,
                  newValue: { label: string | number } | null
                ) => {
                  if (newValue !== null) handleChange(name, newValue.label);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size={"small"}
                    label={""}
                    name={name}
                  />
                )}
              />
            ) : (
              <TextField
                fullWidth={width ? true : false}
                onChange={handleChangeEvent}
                name={name}
                variant="outlined"
                value={summaryState[name]}
                multiline={multiline ? true : false}
                rows={multiline}
                size={"small"}
                {...inputParams}
              />
            )
          ) : (
            <Typography mt={0.8}>{summaryState[name]}</Typography>
          )}
        </Grid>
      </Grid>
      {validate && (
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              backgroundColor: "#2121c5",
              color: "white",
              width: "95%",
              m: "auto",
              mt: "5px",
            }}
            onClick={validate.onClick && validate.onClick}
          >
            {validate.label ? validate.label : "Validate"}
          </Button>
        </Box>
      )}
      {checkBox && (
        <Box sx={{ display: "flex" }}>
          <FormControlLabel
            value="start"
            control={<Checkbox />}
            label={checkBox.label}
            labelPlacement="start"
            sx={{ m: "auto" }}
          />
        </Box>
      )}
    </Box>
  );
};
export default EditableBlock;
