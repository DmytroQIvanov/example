import React, { useEffect, useState } from "react";
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
import { IActiveRowObject } from "../Interfaces/TableWrapperInterfaces";
import { useUser } from "@clerk/nextjs";
import { propsBlockWithState } from "./interfaces";

type date = "numeric" | "2-digit";
export let dateOptions: {
  year: date;
  month: date;
  day: date;
  hour: date;
  minute: date;
  timeZone: string;
} = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",

  timeZone: "America/Los_Angeles",
};
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
  handleChangeArray,
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
  idName,

  value,

  // Edit only existing field (Cannot add it)
  modifyOnlyExistingField,

  ...inputParams
}) => {
  const disableEditableArray = [
    "campus",
    "createdBy",
    "location1",
    "%",
    "date",
    "dmi",
    "dateCreated",
    "dlkv",
    "dfkv",
  ];

  // ---DISABLED STATE---
  // let disabledState = false;
  const [disabledState, setDisabledState] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const func = () => {
    const result = name.toString().split(".");
    if (result.length === 2) {
      return rowValues[result[0]]?.[result[1]];
    } else if (result.length === 3) {
      return rowValues[result[0]]?.[result[1]]?.[result[2]];
    } else {
      return rowValues[name];
    }
  };
  /* eslint-disable */
  useEffect(() => {
    if (!func()) {
      handleChange(name, "");
    }
    if (
      activeRowObject.checkActiveRow(rowValues.id, "change") &&
      !availableStateBoolean
    )
      setDisabledState(disableEditableArray.includes(name));
    if (editable) {
      setDisabledState(false);
    }

    // PUT FULL NAME ON THE ROW
    if (
      name === "createdBy" &&
      activeRowObject.checkActiveRow(rowValues.id, "add")
    ) {
      setDisabledState(true);
      handleChange(name, `${user?.firstName} ${user?.lastName}`);
    }
    // PUT DATE TO DFKV
    if (
      (name === "dfkv" || name === "datefirstknownvalid") &&
      activeRowObject.checkActiveRow(rowValues.id, "add")
    ) {
      const date = new Date();
      const pst = date.toLocaleString("en-US", dateOptions);

      handleChange(name, `${pst}`);
    }
    if (name === "dfkv") {
      setDisabledState(true);
    }
    // PUT DATE TO DFKV
    if (
      (name === "dlkv" || name === "datelastknownvalid") &&
      activeRowObject.activeRow.number === rowValues.id &&
      activeRowObject.activeRow.state === "add"
    ) {
      const date = new Date();
      const pst = date.toLocaleString("en-US", dateOptions);

      handleChange(name, `${pst}`);
    }
    if (name === "dlkv") {
      setDisabledState(true);
    }
    if (name === "dmi" || name === "datemarkedinvalid") {
      setDisabledState(true);
    }
  }, [activeRowObject.activeRow]);
  /* eslint-enable */

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
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={rowValues[name] || ""}
              disabled={disabledState}
              onChange={(newValue) => {
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
              onClick={() => {
                const date = new Date();
                const pst = date.toLocaleString("en-US", dateOptions);
                handleChange("dlkv", `${pst}`);
                changeValidateState(false, true);
              }}
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
              onClick={() => {
                const date = new Date();
                const pst = date.toLocaleString("en-US", dateOptions);
                handleChange("dlkv", pst);
                changeValidateState(false, true);
              }}
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
      case "dropdown":
        return (
          <Typography mt={0.8} style={styles}>
            {/*{value && value}*/}
            {func()}
            {/*{rowValues[name]?.toString()}*/}
          </Typography>
        );
      default:
        if (type === "date") {
          if (!rowValues[name]) return <></>;
          const date = new Date(rowValues[name]);
          return <>{date?.toLocaleString("en-US", dateOptions)}</>;
        }
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
