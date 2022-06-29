import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FaPencilAlt, FaSave, FaWindowClose } from "react-icons/fa";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

import useStyles from "./styles";
import ConfigurationTest, { ConfigurationData, ConfTemplate } from "./Type";

const ConfigurationDisplay = ({
  config,
  onEdit,
}: {
  config: ConfigurationData;
  onEdit: any;
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.editInternal}>
      <Grid
        container
        className={classes.container}
        style={{ paddingTop: "10px" }}
      >
        <Grid item xs={10} className={classes.itemPaddingWhite}>
          <div className={classes.textTitle}>Organization Name</div>
          <div className={classes.textContent}>{config.org_name}</div>
        </Grid>
        <Grid item xs={2} className={classes.itemPaddingWhite}>
          <div className={classes.item}>
            <FaPencilAlt className={classes.icon} onClick={() => onEdit()} />
            <div className={classes.textTitle}>Acronym</div>
            <div className={classes.textContent}>{config.acronym}</div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.container}
        style={{ paddingBottom: "10px" }}
      >
        <Grid item xs={2}>
          <Grid container>
            <Grid item xs={6} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <div className={classes.textTitle}>Campus</div>
                <div className={classes.textContent}>{config.campus}</div>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <div className={classes.textTitle}>Org ID</div>
                <div className={classes.textContent}>{config.org_id}</div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={3} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <div className={classes.textTitle}>Organization Type</div>
                <div className={classes.textContent}>{config.org_type}</div>
              </div>
            </Grid>
            <Grid item xs={3} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <div className={classes.textTitle}>Division</div>
                <div className={classes.textContent}>{config.division}</div>
              </div>
            </Grid>
            <Grid item xs={3} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <div className={classes.textTitle}>University Name</div>
                <div className={classes.textContent}>
                  {config.university_name}
                </div>
              </div>
            </Grid>
            <Grid item xs={3} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <div className={classes.textTitle}>University Code</div>
                <div className={classes.textContent}>
                  {config.university_code}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.itemPaddingWhite}>
          <div className={classes.item}>
            <div className={classes.prompt}>
              Prompt Add Location{" "}
              <input
                checked={config.prompt_location}
                name="prompt_location"
                // onChange={(e) => {}}
                type="checkbox"
                style={{ margin: "5px 0px 0px 10px" }}
              />
            </div>
            <div className={classes.itemBtn}>
              <Button variant="contained">Propagate Locations</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

const ConfigurationEdit = ({
  data,
  onSave,
  onCancel,
}: {
  data: ConfigurationData;
  onSave: any;
  onCancel: any;
}) => {
  const classes = useStyles();
  const [config, setConfig] = useState<ConfigurationData>(data);

  const handleChange = (e: any) => {
    let update: any = { ...config };
    // update[e.target.name] = e.target.value;
    // setAddress(update)
    if (e.target.name === "prompt_location") {
      update["prompt_location"] = e.target.checked;
    } else if (e.target.name) {
      update[e.target.name] = e.target.value;
    }
    setConfig(update);
  };

  return (
    <Box className={classes.editInternal}>
      <Grid
        container
        className={classes.containerWhite}
        style={{ paddingTop: "15px" }}
      >
        <Grid item xs={9} className={classes.itemPaddingWhite}>
          <div className={classes.item}>
            <TextField
              label="Organization Name"
              variant="outlined"
              size="small"
              onChange={(e) => handleChange(e)}
              value={config.org_name}
              InputLabelProps={{ shrink: true }}
              name="org_name"
              className="full-width"
            />
          </div>
        </Grid>
        <Grid item xs={2} className={classes.itemPaddingWhite}>
          <div className={classes.item}>
            <TextField
              label="Acronym"
              variant="outlined"
              size="small"
              onChange={(e) => handleChange(e)}
              value={config.acronym}
              InputLabelProps={{ shrink: true }}
              name="acronym"
              className="full-width"
            />
          </div>
        </Grid>
        <Grid item xs={1} className={classes.itemPaddingWhite}></Grid>
      </Grid>
      <Grid
        container
        className={classes.containerWhite}
        style={{ paddingBottom: "15px" }}
      >
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={7} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <FormControl className="full-width">
                  <InputLabel id="campus-campus">Campus</InputLabel>
                  <Select
                    labelId="campus-campus"
                    value={config.campus}
                    label="Campus"
                    name="campus"
                    size="small"
                    className="full-width"
                    onChange={(e) => handleChange(e)}
                  >
                    {ConfTemplate.campus &&
                      ConfTemplate.campus.map((item) => {
                        return (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={5} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <TextField
                  label="Org ID"
                  variant="outlined"
                  size="small"
                  onChange={(e) => handleChange(e)}
                  disabled
                  value={config.org_id}
                  InputLabelProps={{ shrink: true }}
                  name="org_id"
                  className="full-width"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={3} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <FormControl className="full-width">
                  <InputLabel id="org-id">Organization Type</InputLabel>
                  <Select
                    labelId="org-id"
                    value={config.org_type}
                    label="Organization Type"
                    name="org_type"
                    size="small"
                    onChange={(e) => handleChange(e)}
                    className="full-width"
                  >
                    {ConfTemplate.org_type &&
                      ConfTemplate.org_type.map((item) => {
                        return (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <FormControl className="full-width">
                  <InputLabel id="division-id">Division</InputLabel>
                  <Select
                    labelId="division-id"
                    value={config.division}
                    label="Campus"
                    name="division"
                    size="small"
                    onChange={(e) => handleChange(e)}
                    className="full-width"
                  >
                    {ConfTemplate.division &&
                      ConfTemplate.division.map((item) => {
                        return (
                          <MenuItem value={item} key={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={4} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <TextField
                  label="University Name"
                  variant="outlined"
                  size="small"
                  value={config.university_name}
                  InputLabelProps={{ shrink: true }}
                  name="university_name"
                  onChange={(e) => handleChange(e)}
                  className="full-width"
                />
              </div>
            </Grid>
            <Grid item xs={2} className={classes.itemPaddingWhite}>
              <div className={classes.item}>
                <TextField
                  label="University Code"
                  variant="outlined"
                  size="small"
                  value={config.university_code}
                  InputLabelProps={{ shrink: true }}
                  name="university_code"
                  onChange={(e) => handleChange(e)}
                  className="full-width"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.itemPaddingWhite}>
          <div className={classes.item}>
            <div className={classes.prompt}>
              Prompt Add Location{" "}
              <input
                checked={config.prompt_location}
                name="prompt_location"
                onChange={(e) => handleChange(e)}
                type="checkbox"
                style={{ margin: "5px 0px 0px 10px" }}
              />
            </div>
            <div className={classes.itemBtn}>
              <Button variant="contained">Propagate Locations</Button>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={1}
          className={classes.itemPaddingWhite}
          style={{ display: "flex", alignItems: "flex-end" }}
        >
          <div
            className={classes.item}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <FaSave
              className={classes.actionIcon}
              onClick={() => onSave(config)}
            />
            <FaWindowClose
              className={classes.actionIcon}
              onClick={() => onCancel()}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

const Configuration = () => {
  const [mode, setMode] = useState("display");
  const [conf, setConf] = useState(ConfigurationTest);

  const classes = useStyles();

  const onSave = (config: ConfigurationData) => {
    setConf(config);
    setMode("display");
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.content}>
      {mode == "display" && (
        <ConfigurationDisplay config={conf} onEdit={() => setMode("edit")} />
      )}
      {mode == "edit" && (
        <ConfigurationEdit
          data={conf}
          onSave={(config: ConfigurationData) => onSave(config)}
          onCancel={() => setMode("display")}
        />
      )}
    </Box>
  );
};

export default Configuration;
