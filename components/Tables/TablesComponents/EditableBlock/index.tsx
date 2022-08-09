import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useUser } from "@clerk/nextjs";
import { propsBlockWithState } from "./interfaces";
import {
  InvalidateComponent,
  ValidateComponent,
  Dropdown,
} from "./Components/index";
import { dateOptions } from "./Components/dateOptions";

const EditableBlock: React.FC<propsBlockWithState> = (data) => {
  const {
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
  } = data;
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
    "date_last_known_valid",
    "date_first_known_valid",
    "date_marked_invalid",
  ];

  const notEditableDate = [
    "date_last_known_valid",
    "date_first_known_valid",
    "date_marked_invalid",
    "date_researched",
  ];
  const createdBy = ["created_by"];

  // ---DISABLED STATE---
  const [disabledState, setDisabledState] = useState(disabled);

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
      activeRowObject.checkActiveRow(rowValues.id, "change")
      // !availableStateBoolean
    ) {
      if (
        disableEditableArray.includes(name) ||
        createdBy.includes(name) ||
        notEditableDate.includes(name)
      ) {
        setDisabledState(true);
      }
    }
    if (editable) {
      setDisabledState(false);
    }

    // PUT FULL NAME ON THE ROW
    if (
      createdBy.includes(name) &&
      activeRowObject.checkActiveRow(rowValues.id, "add")
    ) {
      setDisabledState(true);
      handleChange(name, `${user?.firstName} ${user?.lastName}`);
    }
    // PUT DATE TO DFKV
    if (
      notEditableDate.includes(name) &&
      activeRowObject.checkActiveRow(rowValues.id, "add")
    ) {
      const date = new Date();
      const pst = date.toLocaleString("en-US", dateOptions);
      setDisabledState(true);

      handleChange(name, `${pst}`);
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
        return (
          <Dropdown {...{ ...data, disabledState, inputParams, styles }} />
        );
      case "date":
        const date = new Date();
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={rowValues[name] || date}
              disabled={disabledState}
              onChange={(newValue) => {
                const date = new Date();
                // const month = newValue.getUTCMonth() + 1;
                // const day = newValue.getUTCDate() + 1;
                // const year = newValue.getUTCFullYear();
                // console.log(`${day}/${month}/${year}`);
                // handleChange(name, `${day}/${month}/${year}`);
                // handleChange(name, `${month}/${day}/${year}`);
                handleChange(
                  name,
                  newValue?.toLocaleString("en-US", newValue) || date
                );
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
        return <ValidateComponent {...data} />;
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
        return <ValidateComponent {...data} />;
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
            {func()}
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
