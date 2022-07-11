import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStyles from "./styles";

import { Autocomplete } from "@react-google-maps/api";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import Modal from "../../Modal/Modal";
import { useMutation } from "@apollo/client";
import { CREATE_HOME_ADDRESS } from "../../../shemas/HomeAddressShemas";
import { useAddressEditModal } from "./useAddressEditModal";

const AddressEditModal = ({
  open,
  data,
  title,
  handleClose,
  onChangeAddress,
  modalProps,
}: any) => {
  const classes = useStyles();
  const {
    address,
    functions: { handleSubmit, onKeypress, handleChange, onSave, onCancel },
    isLoaded,
    onLoad,
    onPlaceChanged,
    sources,
    apartmentInputReference,
  } = useAddressEditModal({ data, onChangeAddress, handleClose });

  const [mutateFunction, { loading: creatingLoading }] =
    useMutation(CREATE_HOME_ADDRESS);

  // mutateFunction({ variables: state }).then((data) => {
  //   goTo(data.data.insert_person.returning[0].person_id);
  //   setEditStatus(0);
  // });

  return (
    <Modal open={open} title={title} handleClose={handleClose}>
      <Box sx={{ flexGrow: 1 }} className={classes.addressModal}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {isLoaded && (
              <>
                <form className="flex" onSubmit={handleSubmit}>
                  <div className="MuiFormControl-root MuiTextField-root makeStyles-fullWidth-6 css-1u3bzj6-MuiFormControl-root-MuiTextField-root full-width">
                    <Autocomplete
                      onLoad={onLoad}
                      fields={["address_components", "geometry"]}
                      types={["address"]}
                      onPlaceChanged={onPlaceChanged}
                      className={classes.fullWidth}
                    >
                      <TextField
                        sx={{ width: "100%" }}
                        placeholder={"Search Address..."}
                        onKeyUp={(event) => onKeypress(event)}
                      />
                    </Autocomplete>
                  </div>
                </form>
              </>
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
                className={classes.fullWidth}
              >
                {sources.map((item, itemIndex) => {
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
