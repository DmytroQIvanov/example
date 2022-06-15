import React, { useRef, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStyles from "./styles";

import { useLoadScript, Autocomplete } from "@react-google-maps/api";

import {
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

const scriptOptions = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  libraries: ["places"],
};

const initialAddress = {
  source: "",
  comments: "",
  streetnumber: "",
  streetname: "",
  country: "",
  postal: "",
  formatted_address: "",
  google_formatted: "",
};

const AddressEditModal = ({
  open,
  data,
  title,
  handleClose,
  onChangeAddress,
  modalProps,
}: any) => {
  const [address, setAddress] = React.useState({
    source: "",
    comments: "",
    streetnumber: "",
    streetname: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    apartment: "",
    full: "",
    google_formatted: "",
    formatted_address: "",
    zip: "",

    location_accuracy: "",
    // "information_source_type": {
    //   "informationsourcetypeid": 5,
    //   "informationsourcetype": "U. List"
    // },
    // "comments": null,
    // "datefirstknownvalid": "2018-01-09T00:00:00",
    // "datelastknownvalid": "2018-03-06T00:00:00",
    // "datemarkedinvalid": null
  });

  const { isLoaded, loadError } = useLoadScript(scriptOptions);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [autocompleteBoolean, setAutocompleteBoolean] = useState<any>(null);
  const inputEl = useRef(null);

  const apartmentInputReference = useRef(null);

  useEffect(() => {
    if (autocompleteBoolean) {
      apartmentInputReference &&
        apartmentInputReference.current &&
        apartmentInputReference.current.focus();
      setAutocompleteBoolean(false);
    }
  }, [autocompleteBoolean]);

  const classes = useStyles();

  useEffect(() => {
    setAddress(data?.address);
  }, [data]);

  // Handle the keypress for input
  const onKeypress = (e: KeyboardEvent) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const onLoad = (autocompleteObj: any) => {
    setAutocomplete(autocompleteObj);
  };

  const handleChange = (e: any) => {
    let update: any = { ...address };

    // @ts-ignore
    update[e.target.name] = e.target.value;
    setAddress(update);
  };

  const onPlaceChanged = (e: any) => {
    let autoAddress = {
      ...address,
      streetnumber: "",
      streetname: "",
      city: "",
      state: "",
      postal: "",
      country: "",
      full: "",
    };
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setAutocompleteBoolean(true);

      let fullAddress: any[] = [];
      if ("address_components" in place) {
        place["address_components"].forEach((item: any) => {
          if (item["types"][0] == "street_number" && item["long_name"]) {
            autoAddress = { ...autoAddress, streetnumber: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "route" && item["long_name"]) {
            autoAddress = { ...autoAddress, streetname: item["long_name"] };
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
    setAddress(initialAddress);
  };
  const onCancel = () => {
    handleClose();
    setAddress(initialAddress);
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
                          <legend className="css-1ftyaf0">
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
                  return (
                    <MenuItem value={item.value} key={itemIndex}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Street Number"
              variant="outlined"
              value={address?.streetnumber}
              InputLabelProps={{ shrink: true }}
              name="streetnumber"
              onChange={(e) => handleChange(e)}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Street Name"
              variant="outlined"
              value={address?.streetname}
              name="streetname"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e)}
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apartment"
              variant="outlined"
              name="apartment"
              value={address?.apartment}
              // ref={apartmentInputReference}
              inputRef={apartmentInputReference}
              InputLabelProps={{ shrink: true }}
              className={classes.fullWidth}
              onChange={(e) => handleChange(e)}
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
