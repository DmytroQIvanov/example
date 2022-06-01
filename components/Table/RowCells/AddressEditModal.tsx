import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStyles from "./styles";

import { useLoadScript, Autocomplete } from "@react-google-maps/api";

import {
  Input,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import Modal from "../../Modal/Modal";

const Sources = [
  { value: "Paper Card", label: "Paper Card" },
  { value: "On the Ground", label: "On the Ground" },
  { value: "UC List", label: "UC List" },
];

console.log(process.env.NEXT_PUBLIC_API_KEY);
const scriptOptions = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  libraries: ["places"],
};

const AddressEditModal = ({
  open,
  data,
  title,
  handleClose,
  onChangeAddress,
  modalProps,
}: any) => {
  const [address, setAddress] = React.useState({ source: "", comments: "" });

  const { isLoaded, loadError } = useLoadScript(scriptOptions);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputEl = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    setAddress(data?.address);
  }, [data]);

  // Handle the keypress for input
  const onKeypress = (e) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onLoad = (autocompleteObj: any) => {
    setAutocomplete(autocompleteObj);
  };

  const handleChange = (e: any) => {
    let update = { ...address };

    update[e.target.name] = e.target.value;
    setAddress(update);
  };

  const onPlaceChanged = (e) => {
    let autoAddress = {
      ...address,
      street_number: "",
      street: "",
      city: "",
      state: "",
      postal: "",
      country: "",
      full: "",
    };
    if (autocomplete) {
      const place = autocomplete.getPlace();
      let fullAddress: array = [];
      if ("address_components" in place) {
        place["address_components"].forEach((item) => {
          if (item["types"][0] == "street_number" && item["long_name"]) {
            autoAddress = { ...autoAddress, street_number: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "route" && item["long_name"]) {
            autoAddress = { ...autoAddress, street: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "locality" && item["long_name"]) {
            autoAddress = { ...autoAddress, city: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (
            item["types"][0] == "administrative_area_level_1" &&
            item["long_name"]
          ) {
            autoAddress = { ...autoAddress, state: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "postal_code" && item["long_name"]) {
            autoAddress = { ...autoAddress, postal: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "country" && item["long_name"]) {
            autoAddress = { ...autoAddress, country: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
        });

        autoAddress = { ...autoAddress, full: fullAddress.join(", ") };
        setAddress(autoAddress);
      }
    }
  };

  const onSave = () => {
    onChangeAddress(address);
    handleClose();
  };
  const onCancel = () => {
    handleClose();
  };

  return (
    <Modal open={open} title={title} handleClose={handleClose}>
      <Box sx={{ flexGrow: 1 }} className={classes.addressModal}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {isLoaded && (
              <React.Fragment>
                <form className="flex" onSubmit={handleSubmit}>
                  <div className="MuiFormControl-root MuiTextField-root makeStyles-fullWidth-6 css-1u3bzj6-MuiFormControl-root-MuiTextField-root full-width">
                    <Autocomplete
                      onLoad={onLoad}
                      fields={["address_components", "geometry"]}
                      types={["address"]}
                      onPlaceChanged={onPlaceChanged}
                      className={classes.fullWidth}
                    >
                      <div className="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root full-width">
                        <input
                          ref={inputEl}
                          type="text"
                          className="MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input full-width"
                          onKeyPress={onKeypress}
                          placeholder="Search Address..."
                          name="fullAddress"
                        />
                        <fieldset
                          aria-hidden="true"
                          className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
                        >
                          <legend class="css-1ftyaf0">
                            <span>Address</span>
                          </legend>
                        </fieldset>
                      </div>
                    </Autocomplete>
                  </div>
                </form>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.fullWidth}>
              <InputLabel id="source-label">Source</InputLabel>
              <Select
                labelId="source-label"
                value={address?.source}
                label="Source"
                name="source"
                onChange={(e) => handleChange(e)}
                InputLabelProps={{ shrink: true }}
                className={classes.fullWidth}
              >
                {Sources.map((item, itemIndex) => {
                  return <MenuItem value={item.value}>{item.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Street Number"
              variant="outlined"
              value={address?.street_number}
              InputLabelProps={{ shrink: true }}
              name="street_number"
              onChange={(e) => handleChange(e)}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Street Name"
              variant="outlined"
              value={address?.street}
              name="street"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e)}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apt"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              className={classes.fullWidth}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="City"
              variant="outlined"
              value={address?.city}
              name="city"
              InputLabelProps={{ shrink: true }}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="State"
              variant="outlined"
              value={address?.state}
              name="state"
              InputLabelProps={{ shrink: true }}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Postal Code"
              variant="outlined"
              value={address?.postal}
              name="postal"
              InputLabelProps={{ shrink: true }}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Country"
              variant="outlined"
              value={address?.country}
              name="country"
              InputLabelProps={{ shrink: true }}
              className={classes.fullWidth}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.section}>
          <Grid item xs={10}>
            <TextField
              label="Goggle Formatted"
              disabled
              variant="outlined"
              value={address?.google_formatted}
              name="google_formatted"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <TextField
              label="UC Formatted Address"
              disabled
              variant="outlined"
              value={address?.formatted_address}
              name="formatted_address"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid container spacing={2} className={classes.section}>
          <Grid item xs={10}>
            <TextField
              label="Comments"
              multiline
              rows={4}
              variant="outlined"
              value={address?.comments}
              onChange={(e) => handleChange(e)}
              name="comments"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={2}>
            <div>
              <Button variant="contained" color="error" onClick={onCancel}>
                Cancel
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={onSave}
                className={classes.saveBtn}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddressEditModal;
