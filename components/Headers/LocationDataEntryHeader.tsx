// @ts-nocheck
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {
  Input,
  TextField,
  NativeSelect,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  InputBase
} from '@mui/material';

import SearchMenu from '../Search/SearchBox';
import { ConfTemplate } from '../Configuration/Type';
import { BootstrapInput } from '../Search/Type';

export function LocationDataEntryHeader() {
  return (
    <div className="header" >
      <Box >
        <Grid container>
          {/*<Grid item sm={3}>*/}
            {/*<Grid container>*/}
              {/*<Grid item sm={6}>*/}
              {/*  <FormControl sx={{ m: 1, width: '90%' }} variant="standard">*/}
              {/*    <Button*/}
              {/*      sx={[*/}
              {/*        {*/}
              {/*          background: 'white',*/}
              {/*          color: '#134A90'*/}
              {/*        },*/}
              {/*        {*/}
              {/*          '&:hover': {*/}
              {/*            background: '#efefef'*/}
              {/*          }*/}
              {/*        }*/}
              {/*      ]}*/}
              {/*      variant="contained">Show Smaller</Button>*/}
              {/*  </FormControl>*/}
              {/*</Grid>*/}
              {/*<Grid item sm={6}>*/}
              {/*  <FormControl sx={{ m: 1, width: '90%' }} variant="standard">*/}
              {/*    <NativeSelect*/}
              {/*      id="campus-id"*/}
              {/*      label="Campus"*/}
              {/*      name="campus"*/}
              {/*      InputLabelProps={{'shrink': true}}*/}
              {/*      size="small"*/}
              {/*      input={<BootstrapInput />}*/}
              {/*    >*/}
              {/*      <option className="default-option" value="">Campus</option>*/}
              {/*      {ConfTemplate.campus.map((item, itemIndex) => {*/}
              {/*        // eslint-disable-next-line react/jsx-key*/}
              {/*        return <option value={item}>{item}</option>;*/}
              {/*      })}*/}
              {/*    </NativeSelect>*/}
              {/*  </FormControl>*/}
              {/*</Grid>*/}
            {/*</Grid>*/}
          {/*</Grid>*/}
          <Grid item sm={5}>
            <Grid container>
              <Grid item sm={12}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                  <SearchMenu />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={7}>
            <Grid container>
              <Grid item sm={3}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <NativeSelect
                      id="fullname-id"
                      label="Fullname"
                      name="fullname"
                      size="small"
                      input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">Organization Name</option>
                    {ConfTemplate.campus.map((item, itemIndex) => {
                      // eslint-disable-next-line react/jsx-key
                      return <option value={item}>{item}</option>;
                    })}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <NativeSelect
                      id="fullname-id"
                      label="Fullname"
                      name="fullname"
                      size="small"
                      input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">Campus</option>
                    {ConfTemplate.campus.map((item, itemIndex) => {
                      // eslint-disable-next-line react/jsx-key
                      return <option value={item}>{item}</option>;
                    })}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <NativeSelect
                    id="person-id"
                    labelId="person"
                    label="Person"
                    name="person"
                    size="small"
                    input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">Org type</option>
                    {ConfTemplate.campus.map((item, itemIndex) => {
                      // eslint-disable-next-line react/jsx-key
                      return <option value={item}>{item}</option>;
                    })}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <Button variant="contained" color="success">Add New Organization</Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}