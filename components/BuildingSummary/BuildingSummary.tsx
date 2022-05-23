import React, { useState } from "react";
import {
  Grid,
  Input,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Box from "@mui/material/Box";

const BuildingSummary = () => {
  interface valuesTypes {
    campus: string;
    buildingID: string;
    buildingAcronym: string;
    buildingSector: string;
    buildingName: string;
    streetNumber: number;
    streetName: string;
    city: string;
    state: string;
    zip: number;
    comments: string;
  }

  const [editState, setEditState] = useState(false);
  const [summaryState, setSummaryState] = useState<valuesTypes>({
    campus: "Santa Barbara",
    buildingID: "645",
    buildingName: "Noble Hail",
    city: "Eureaka",
    zip: 91362,
    buildingAcronym: "NOBLE",
    buildingSector: "HGX",
    comments: "Also known as Building 544",
    state: "CA",
    streetName: "Discovery",
    streetNumber: 123,
  });
  function handleChangeEvent(event: React.ChangeEvent<any>) {
    const { name, value } = event.target;
    setSummaryState({
      ...summaryState,
      [name]: value,
    });
  }
  function handleChange(name: string, text: string | number) {
    setSummaryState({
      ...summaryState,
      [name]: text.toString(),
    });
  }
  const blockWithState: React.FC<{
    title: string;
    name: keyof valuesTypes;
    disabled?: boolean;
    width?: number;
    itemsArray?: { label: string }[];
    type?: "textField" | "dropdown";
    multiline?: number;
  }> = ({
    title,
    name,
    width,
    type = "textField",
    multiline,
    itemsArray,
    ...inputParams
  }) => {
    return (
      <Grid container direction="column">
        <Grid item>
          <Typography color={"gray"}>{title}</Typography>
        </Grid>
        <Grid item width={width && `${width}%`}>
          {editState ? (
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
    );
  };
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "10px 10px",
        padding: "25px 45px",
        position: "relative",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {blockWithState({
            name: "campus",
            title: "Campus",
            type: "dropdown",
            itemsArray: [{ label: "test" }],
          })}
        </Grid>
        <Grid item xs={3}>
          {blockWithState({
            name: "buildingID",
            title: "Building ID",
            disabled: true,
          })}
        </Grid>
        <Grid item xs={3}>
          {blockWithState({
            name: "buildingAcronym",
            title: "Building Acronym",
          })}
        </Grid>
        <Grid item xs={3}>
          {blockWithState({
            name: "buildingSector",
            title: "Building Sector",
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1.5}>
        <Grid item xs={3}>
          {blockWithState({
            name: "buildingName",
            title: "Building Name",
            width: 200,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1.5}>
        <Grid item xs={2.4}>
          {blockWithState({ name: "streetNumber", title: "Street Number" })}
        </Grid>
        <Grid item xs={2.4}>
          {blockWithState({ name: "streetName", title: "Street Name" })}
        </Grid>
        <Grid item xs={2.4}>
          {blockWithState({
            name: "city",
            title: "City",
          })}
        </Grid>
        <Grid item xs={2.4}>
          {blockWithState({
            name: "state",
            title: "State",
          })}
        </Grid>

        <Grid item xs={2.4}>
          {blockWithState({
            name: "zip",
            title: "Zip",
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1.5}>
        <Grid item xs={12}>
          {blockWithState({
            name: "comments",
            title: "Comments",
            width: 80,
            multiline: 4,
          })}
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          right: "25px",
          bottom: "25px",
        }}
      >
        {!editState ? (
          <EditIcon
            cursor={"pointer"}
            height={"20px"}
            onClick={() => setEditState((prevState) => !prevState)}
          />
        ) : (
          <div>
            <CancelOutlinedIcon
              sx={{ mr: "18px" }}
              cursor={"pointer"}
              onClick={() => setEditState((prevState) => !prevState)}
            />
            <SaveOutlinedIcon
              cursor={"pointer"}
              onClick={() => setEditState((prevState) => !prevState)}
            />
          </div>
        )}
      </Box>
    </div>
  );
};

export default BuildingSummary;
