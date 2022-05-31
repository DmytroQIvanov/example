import React, { CSSProperties, useEffect } from "react";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface propsBlockWithState {
  title?: string;
  name: string;
  disabled?: boolean;
  width?: number;
  itemsArray?: { label: string }[];
  type?: "textField" | "dropdown" | "date" | "checkBox";
  multiline?: number;
  editStateBoolean: "default" | "change" | "add";
  summaryState: { [index: string]: any };
  titleVisibly?: boolean;
  handleChange: Function;
  style?: CSSProperties;
  className?: string;
  checkBox?: {
    label?: string;
    textVariants?: { trueVariant: string; falseVariant: string };
    type?: "green" | "default";
    onClick?: () => void;
    value?: boolean;
    disabled?: boolean;
  };
  validate?: {
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    label?: string;
  };
  handleChangeEvent?: React.ChangeEventHandler<
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
  const disableEditableArray = ["campus"];

  let disabledState = false;
  if (editStateBoolean === "change")
    disabledState = disableEditableArray.includes(name);

  const Component = () => {
    switch (type) {
      case "textField":
        return (
          <TextField
            fullWidth={width ? true : false}
            onChange={handleChangeEvent}
            name={name}
            variant="outlined"
            value={summaryState[name] || null}
            multiline={multiline ? true : false}
            rows={multiline}
            size={"small"}
            disabled={disabledState}
            {...inputParams}
          />
        );

      case "dropdown":
        if (itemsArray && itemsArray.length >= 1) {
          return (
            <Autocomplete
              disablePortal
              options={itemsArray && itemsArray}
              fullWidth={width ? true : false}
              {...inputParams}
              disabled={disabledState}
              value={{ label: summaryState[name] || "" }}
              onChange={(
                event: any,
                newValue: { label: string | number } | null
              ) => {
                if (newValue !== null) handleChange(name, newValue.label);
              }}
              renderInput={(params) => (
                <TextField {...params} size={"small"} label={""} name={name} />
              )}
            />
          );
        } else {
          return <></>;
        }
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={summaryState[name]}
              disabled={disabledState}
              onChange={(newValue) => {
                const month = newValue.getUTCMonth() + 1;
                const day = newValue.getUTCDate();
                const year = newValue.getUTCFullYear();
                handleChange(name, `${day}/${month}/${year}`);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        );
      case "checkBox":
        return (
          <>
            <Checkbox
              disabled={disabledState}
              checked={summaryState[name]}
              onChange={(event) => handleChange(name, event.target.checked)}
            />
          </>
        );
      default:
        return (
          <TextField
            fullWidth={width ? true : false}
            onChange={handleChangeEvent}
            name={name}
            variant="outlined"
            disabled={disabledState}
            value={summaryState[name]}
            multiline={multiline ? true : false}
            rows={multiline}
            size={"small"}
            {...inputParams}
          />
        );
    }
  };

  const TextComponent = () => {
    switch (type) {
      case "checkBox":
        return (
          <Typography
            mt={0.8}
            style={checkBox?.type == "green" ? { color: "green" } : {}}
          >
            {checkBox?.textVariants
              ? summaryState[name]
                ? checkBox?.textVariants.trueVariant
                : checkBox?.textVariants.falseVariant
              : summaryState[name]
              ? "Yes"
              : "N/A"}
          </Typography>
        );
      default:
        return <Typography mt={0.8}>{summaryState[name]}</Typography>;
    }
  };

  return (
    <Box sx={{ m: "7px 0" }}>
      <Grid container direction="column" position="relative">
        <Grid item>
          {title && (
            <>
              {!titleVisibly ? (
                editStateBoolean !== "default" && (
                  <Typography color={"gray"}>{title}</Typography>
                )
              ) : (
                <Typography color={"gray"}>{title}</Typography>
              )}
            </>
          )}
        </Grid>
        <Grid item width={width && `${width}%`}>
          {editStateBoolean !== "default" ? Component() : <TextComponent />}
        </Grid>
      </Grid>
      {validate && validate?.disabled && (
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              backgroundColor: "#2121c5",
              color: "white",
              width: "95%",
              p: "3px",
              mt: "5px",
            }}
            onClick={validate.onClick ? validate.onClick : console.log}
          >
            {validate.label ? validate.label : "Validate"}
          </Button>
        </Box>
      )}
      {checkBox && type !== "checkBox" && (
        <Box sx={{ display: "flex" }}>
          <FormControlLabel
            value="start"
            control={
              <Checkbox
                onChange={checkBox.onClick && checkBox.onClick}
                checked={checkBox.value && checkBox.value}
                disabled={checkBox?.disabled}
              />
            }
            label={checkBox.label}
            labelPlacement="start"
            sx={{ ml: "0" }}
          />
        </Box>
      )}
    </Box>
  );
};
export default EditableBlock;
