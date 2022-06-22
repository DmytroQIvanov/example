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
import {
  ISummaryObject,
  rowStateTypes,
} from "../../../../hooks/UseEditableTable";
import { IActiveRowObject } from "../Interfaces/TableWrapperInterfaces";

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
  name?: string;
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
  titleVisibly?: boolean;
  style?: CSSProperties;
  className?: string;
  availableStateBoolean?: boolean;
  checkBox?: ICheckBox;
  removeComponent?: boolean;
  modifyOnlyExistingField?: boolean;
}
const InvalidateComponent = ({
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
                : rowValues["datemarkedinvalid"]
            }
            disabled={rowValues["datemarkedinvalid"]}
          />
        }
        label={"Invalidate"}
        labelPlacement="start"
        sx={{ ml: "0" }}
      />
    </Box>
  );
};

const EditableBlock: React.FC<propsBlockWithState> = ({
  title,
  name = "null",
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
  removeComponent,

  activeRowObject,

  // Edit only existing field (Cannot add it)
  modifyOnlyExistingField,

  ...inputParams
}) => {
  const disableEditableArray = [
    "campus",
    "createdBy",
    "location1",
    // "location2",
    "%",
    "date",
    "dmi",
  ];

  useEffect(() => {
    if (!rowValues[name]) {
      handleChange(name, "");
    }
  }, []);

  let disabledState = false;
  if (rowState === "change" && !availableStateBoolean)
    disabledState = disableEditableArray.includes(name);
  if (editable) {
    disabledState = false;
  }
  let styles = disabledState ? { backgroundColor: "#C3DBFF" } : {};

  const Component = () => {
    if (
      activeRowObject.activeRow.number === rowValues.id &&
      activeRowObject.activeRow.state === "add" &&
      modifyOnlyExistingField
    )
      return;
    if (!rowValues[name] && modifyOnlyExistingField) return;

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
              value={rowValues[name] || "11/11/2011"}
              disabled={disabledState}
              onChange={(newValue) => {
                // console.log(newValue);
                // console.log(typeof newValue);
                const month = newValue.getUTCMonth() + 1;
                const day = newValue.getUTCDate();
                const year = newValue.getUTCFullYear();
                console.log(`${day}/${month}/${year}`);
                // handleChange(name, `${day}/${month}/${year}`);
                handleChange(name, `${month}/${day}/${year}`);
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
              checked={rowValues[name] || false}
              onChange={(event) => handleChange(name, event.target.checked)}
            />
          </>
        );
      case "invalidate":
        return (
          <InvalidateComponent
            rowValues={rowValues}
            activeRowObject={activeRowObject}
            validateState={validateState}
            changeValidateState={changeValidateState}
          />
        );
      case "validate":
        return (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                backgroundColor: "#134A90",
                color: "white",
                width: "95%",
                p: "3px",
                mt: "5px",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#0e3e7a",
                },
              }}
              onClick={() => changeValidateState(false)}
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
    let styles = !validateState ? {} : { color: "grey", cursor: "default" };
    switch (type) {
      case "invalidate":
        return (
          <InvalidateComponent
            rowValues={rowValues}
            activeRowObject={activeRowObject}
            validateState={validateState}
            changeValidateState={changeValidateState}
          />
        );
      case "validate":
        return (
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                backgroundColor: "#134A90",
                color: "white",
                width: "95%",
                p: "3px",
                mt: "5px",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#0e3e7a",
                },
              }}
              onClick={() => changeValidateState(false)}
            >
              Validate
            </Button>
          </Box>
        );
      case "checkBox":
        return (
          <Typography
            mt={0.8}
            style={
              !validateState
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
            {rowValues[name]?.toString()}
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
          <Box sx={{ textAlign: "left" }}>
            {rowState !== "default" && !removeComponent ? (
              Component()
            ) : (
              <TextComponent />
            )}
          </Box>
        </Grid>
      </Grid>
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
