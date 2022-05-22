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

export function OrganizationHeader() {
  return (
    <div className="header">
      <Box>
        <Grid container>
          <Grid item sm={6}>
            <Grid container>
              <Grid item sm={3}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <NativeSelect
                    id="campus-id"
                    label="Campus"
                    name="campus"
                    InputLabelProps={{'shrink': true}}
                    size="small"
                    input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">Campus</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item sm={9}>
                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                  <SearchMenu />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Grid container>
              <Grid item sm={5}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <NativeSelect
                    id="org_name-id"
                    label="Organization Name"
                    name="org_name"
                    InputLabelProps={{'shrink': true}}
                    size="small"
                    input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">Organization Name</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <NativeSelect
                    id="org_type-id"
                    label="Organization Type"
                    name="org_type"
                    size="small"
                    input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">Org Type</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Button sx={{
                     fontSize: '13px',
                     fontWeight: '500',
                     lineHeight: '15px',
                     padding: '3px 30px !important'}}
                     variant="contained" color="success">
                       Add New<br/>Organization
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}