import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FaRocketchat } from 'react-icons/fa';
import {
  Input,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';

import useStyles from './styles';
import PiSummaryDataTest from './Type'

const PiSummary = () => {
  const classes = useStyles();
  const config = PiSummaryDataTest;

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.content}>
      <Box className={classes.editInternal}>
        <Grid container className={[classes.container, classes.topSection]}>
          <Grid item xs={2} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.textTitle}>Campus</div>
              <div className={classes.textContent}>{config.campus}</div>
            </div>
          </Grid>
          <Grid item xs={5} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.textTitle}>Pi</div>
              <div className={classes.textContent}>{config.pi}</div>
            </div>
          </Grid>
          <Grid item xs={1} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.textTitle}>Person ID</div>
              <div className={classes.textContent}>{config.person_id}</div>
            </div>
          </Grid>
          <Grid item xs={2} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.textTitle}>Other Campuses</div>
              <div className={classes.textContent}>{config.other_compuses}</div>
            </div>
          </Grid>
          <Grid item xs={2} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.itemBtn}>
                <Button variant="contained">
                  <FaRocketchat className={classes.actionIcon} onClick={() => onSave(config)} /> Propagate Locations
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container className={[classes.container, classes.bottomSection]}>
          <Grid item xs={5} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.textTitle}>Super Area</div>
              <div className={classes.textContent}>{config.super_area}</div>
            </div>
          </Grid>
          <Grid item xs={5} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.textTitle}>Area</div>
              <div className={classes.textContent}>{config.area}</div>
            </div>
          </Grid>
          <Grid item xs={2} className={classes.itemPaddingWhite}>
            <div className={classes.item}>
              <div className={classes.itemBtn}>
                <Button variant="contained" sx={{marginTop: '13px'}}>
                  View Person Records
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PiSummary;