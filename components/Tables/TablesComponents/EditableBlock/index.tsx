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
import { ISummaryObject } from "../../../../hooks/UseEditableTable";

interface ICheckBox {
  label?: string;
  textVariants?: { trueVariant: string; falseVariant: string };
  type?: "green" | "default";
  onClick?: () => void;
  value?: boolean;
  disabled?: boolean;
}

interface propsBlockWithState extends ISummaryObject {
  title?: string;
  name: string;
  disabled?: boolean;
  width?: number;
  editable?: boolean;
  itemsArray?: { label: string }[];
  type?:
    | "textField"
    | "dropdown"
    | "date"
    | "checkBox"
    | "invalidate"
    | "validate";
  multiline?: number;
  // rowValues: { [index: string]: any };
  titleVisibly?: boolean;
  style?: CSSProperties;
  className?: string;
  availableStateBoolean?: boolean;
  checkBox?: ICheckBox;
}

const EditableBlock: React.FC<propsBlockWithState> = ({
  title,
  name,
  width,
  type = "textField",
  multiline,
  itemsArray,
  rowValues,
  rowState,
  handleChange,
  handleChangeEvent,
  titleVisibly = true,
  checkBox,
  editable,
  availableStateBoolean,

  disabled,
  validateState,
  changeValidateState,
  changeRowState,

  ...inputParams
}) => {
  const disableEditableArray = [
    "campus",
    "createdBy",
    "location1",
    // "location2",
    "date",
    "dmi",
  ];

  let disabledState = false;
  if (rowState === "change" && !availableStateBoolean)
    disabledState = disableEditableArray.includes(name);
  if (editable) {
    disabledState = false;
  }
  let styles = disabledState ? { backgroundColor: "#C3DBFF" } : {};
  // styles =
  //   validateState === false ? { ...styles, color: "red" } : { ...styles };

  const Component = () => {
    switch (type) {
      case "textField":
        return (
          <TextField
            fullWidth={width ? true : false}
            onChange={handleChangeEvent}
            name={name}
            style={styles}
            variant="outlined"
            value={rowValues[name] || null}
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
              value={{ label: rowValues[name] || "" }}
              onChange={(
                event: any,
                newValue: { label: string | number } | null
              ) => {
                if (newValue !== null) handleChange(name, newValue.label);
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
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={rowValues[name]}
              disabled={disabledState}
              onChange={(newValue) => {
                const month = newValue.getUTCMonth() + 1;
                const day = newValue.getUTCDate();
                const year = newValue.getUTCFullYear();
                handleChange(name, `${day}/${month}/${year}`);
              }}
              renderInput={(params) => <TextField {...params} style={styles} />}
            />
          </LocalizationProvider>
        );
      case "checkBox":
        return (
          <>
            {checkBox && checkBox.label && `${checkBox.label} :`}
            <Checkbox
              disabled={disabledState}
              style={styles}
              checked={rowValues[name]}
              onChange={(event) => handleChange(name, event.target.checked)}
            />
          </>
        );
      case "invalidate":
        return (
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  onChange={() => changeValidateState()}
                  checked={
                    rowState === "default"
                      ? rowValues.validateState
                      : !validateState
                  }
                  disabled={rowState === "default" && rowValues.validateState}
                />
              }
              label={"Invalidate"}
              labelPlacement="start"
              sx={{ ml: "0" }}
            />
          </Box>
        );
      case "validate":
        return (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                backgroundColor: "#2121c5",
                color: "white",
                width: "95%",
                p: "3px",
                mt: "5px",
              }}
              onClick={() => changeValidateState(true)}
            >
              Validate
            </Button>
          </Box>
        );
      default:
        return (
          <TextField
            fullWidth={width ? true : false}
            onChange={handleChangeEvent}
            name={name}
            style={styles}
            variant="outlined"
            disabled={disabledState}
            value={rowValues[name]}
            multiline={multiline ? true : false}
            rows={multiline}
            size={"small"}
            {...inputParams}
          />
        );
    }
  };

  const TextComponent = () => {
    let styles = validateState ? {} : { color: "grey", cursor: "default" };
    switch (type) {
      case "invalidate":
        return (
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  onChange={() => changeValidateState()}
                  checked={!validateState}
                  disabled={!validateState}
                />
              }
              label={"Invalidate"}
              labelPlacement="start"
              sx={{ ml: "0" }}
            />
          </Box>
        );
      case "validate":
        return (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                backgroundColor: "#2121c5",
                color: "white",
                width: "95%",
                p: "3px",
                mt: "5px",
              }}
              onClick={() => changeValidateState(true)}
            >
              Validate
            </Button>
          </Box>
        );
      case "checkBox":
        return (
          <Typography
            mt={0.8}
            // style={checkBox?.type == "green" ? { color: "green" } : {}}
            style={
              validateState
                ? rowValues[name]
                  ? { color: "green" }
                  : { color: "red" }
                : { color: "grey" }
            }
          >
            {checkBox?.textVariants
              ? rowValues[name]
                ? checkBox?.textVariants.trueVariant
                : checkBox?.textVariants.falseVariant
              : rowValues[name]
              ? "Yes"
              : "N/A"}
          </Typography>
        );
      default:
        return (
          <Typography mt={0.8} style={styles}>
            {rowValues[name]}
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ m: "7px 0" }}>
      <Grid container direction="column" position="relative">
        <Grid item>
          {title && (
            <>
              {!titleVisibly ? (
                rowState !== "default" && (
                  <Typography color={"gray"}>{title}</Typography>
                )
              ) : (
                <Typography color={"gray"}>{title}</Typography>
              )}
            </>
          )}
        </Grid>
        <Grid item width={width && `${width}%`}>
          {rowState !== "default" ? Component() : <TextComponent />}
        </Grid>
      </Grid>
      {/*{validate && validate?.disabled && (*/}
      {/*  <Box sx={{ display: "flex" }}>*/}
      {/*    <Button*/}
      {/*      sx={{*/}
      {/*        backgroundColor: "#2121c5",*/}
      {/*        color: "white",*/}
      {/*        width: "95%",*/}
      {/*        p: "3px",*/}
      {/*        mt: "5px",*/}
      {/*      }}*/}
      {/*      onClick={*/}
      {/*        validate && validate.onClick*/}
      {/*          ? () => validate.onClick && validate.onClick()*/}
      {/*          : console.log*/}
      {/*      }*/}
      {/*    >*/}
      {/*      {validate.label ? validate.label : "Validate"}*/}
      {/*    </Button>*/}
      {/*  </Box>*/}
      {/*)}*/}
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
