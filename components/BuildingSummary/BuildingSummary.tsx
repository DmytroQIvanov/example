import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  BUILDING_MUTATION,
  BUILDING_QUERY,
} from "../../schemas/BuildingSummarySchema";
import { UseGetCampus } from "../../hooks/UseGetCampus";
import { useDropDownFunction } from "./DropDownFunction";
import { deepStateFunction } from "./deepStateFunction";

const BuildingSummary = () => {
  interface valuesTypes {
    building_id: 2;
    campus: {
      campus_id: 2;
      campus_name: "San Francisco";
    };
    building_acronym: "Acr";
    sector: "Lasas";
    building_name: "Building Name";
    building_street_number: null;
    building_street_name: null;
    building_city: null;
    building_state: null;
    building_zip: null;
    comments: "Lorem";
  }
  const router = useRouter();
  const { data, loading, error } = useQuery(BUILDING_QUERY, {
    variables: { id: router.query.id },
    skip: !router.query.id,
  });
  const [editState, setEditState] = useState(false);
  const [summaryState, setSummaryState] = useState<valuesTypes | null>(null);
  const [editableState, setEditableState] = useState<valuesTypes | null>(null);
  useEffect(() => {
    data && data?.building_by_pk && setSummaryState(data.building_by_pk);
  }, [data]);

  useEffect(() => {
    setEditableState(summaryState);
  }, [summaryState]);

  function handleChangeEvent(event: React.ChangeEvent<any>) {
    const { name, value } = event.target;
    setEditableState((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
  function handleChange(name: string, text: string | number) {
    setEditableState((prevState: any) => {
      return {
        ...prevState,
        [name]: text.toString(),
      };
    });
  }

  const handleChangeArray = (
    data: {
      name: string;
      value: string | number | boolean | Date | null;
    }[]
  ) => {
    setEditableState((prevState: any) => {
      return deepStateFunction(
        data.map((elem) => {
          return { ...elem, prevState };
        })
      );
    });
  };

  const [mutateFunction] = useMutation(BUILDING_MUTATION);

  const onSave = () => {
    setEditState((prevState) => !prevState);
    setSummaryState(editableState);
    mutateFunction({
      variables: {
        ...editableState,
        campus_id: editableState?.campus?.campus_id,
      },
    });
  };

  const { campusArray } = UseGetCampus();
  const onCancel = () => {
    setEditState((prevState) => !prevState);
    setEditableState(summaryState);
  };

  const blockWithState: React.FC<{
    title: string;
    name: keyof valuesTypes | string;
    idName?: string;
    disabled?: boolean;
    width?: number;
    itemsArray?: { label: string; id: string }[];
    type?: "textField" | "dropdown";
    multiline?: number;
  }> = ({
    title,
    name,
    width,
    type = "textField",
    multiline,
    itemsArray,
    idName,
    ...inputParams
  }) => {
    const { dropDownFunction } = useDropDownFunction(
      editState ? editableState : summaryState
    );
    const data = dropDownFunction(name);

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
                {...inputParams}
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
                  newValue: {
                    label: string | number;
                    id: number | string;
                  } | null
                ) => {
                  if (!newValue || !name || !idName) {
                    event.preventDefault();
                    handleChangeArray([
                      { name, value: null },
                      { name: idName, value: null },
                    ]);
                    return;
                  }
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
                    // style={styles}
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
                value={dropDownFunction(name)}
                multiline={multiline ? true : false}
                rows={multiline}
                size={"small"}
                {...inputParams}
              />
            )
          ) : (
            <Typography mt={0.8}>{data}</Typography>
          )}
        </Grid>
      </Grid>
    );
  };
  if (loading)
    return (
      <Box sx={{ display: "flex", height: "400px", width: "100%" }}>
        <Box sx={{ display: "flex", margin: "auto" }}>
          <CircularProgress />
        </Box>
      </Box>
    );

  if (!data?.building_by_pk) {
    return (
      <Box sx={{ display: "flex", height: "400px", width: "100%" }}>
        <Typography sx={{ display: "flex", margin: "auto", fontSize: "24px" }}>
          Nothing Found
        </Typography>
      </Box>
    );
  }

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "10px 10px",
        padding: "25px 35px",
        position: "relative",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {blockWithState({
            name: "campus.campus_name",
            idName: "campus.campus_id",

            title: "Campus",
            type: "dropdown",
            itemsArray: campusArray,
          })}
        </Grid>
        <Grid item xs={3}>
          {blockWithState({
            name: "building_id",
            title: "Building ID",
            disabled: true,
          })}
        </Grid>
        <Grid item xs={3}>
          {blockWithState({
            name: "building_acronym",
            title: "Building Acronym",
          })}
        </Grid>
        <Grid item xs={3}>
          {blockWithState({
            name: "sector",
            title: "Building Sector",
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1.5}>
        <Grid item xs={3}>
          {blockWithState({
            name: "building_name",
            title: "Building Name",
            width: 200,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1.5}>
        <Grid item xs={2.4}>
          {blockWithState({
            name: "building_street_number",
            title: "Street Number",
          })}
        </Grid>
        <Grid item xs={2.4}>
          {blockWithState({
            name: "building_street_name",
            title: "Street Name",
          })}
        </Grid>
        <Grid item xs={2.4}>
          {blockWithState({
            name: "building_city",
            title: "City",
          })}
        </Grid>
        <Grid item xs={2.4}>
          {blockWithState({
            name: "building_state",
            title: "State",
          })}
        </Grid>

        <Grid item xs={2.4}>
          {blockWithState({
            name: "building_zip",
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
              onClick={onCancel}
            />
            <SaveOutlinedIcon cursor={"pointer"} onClick={onSave} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default BuildingSummary;
