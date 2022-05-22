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

export function PiDataEntryHeader() {
  return (
    <div className="header">
      <Box>
        <Grid container>
          <Grid item sm={8}>
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
          <Grid item sm={4}>
            <Grid container>
              <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <NativeSelect
                    id="fullname-id"
                    label="Fullname"
                    name="fullname"
                    size="small"
                    input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">Last, First</option>
                    {ConfTemplate.campus.map((item, itemIndex) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
                  <Button sx={{
                     fontSize: '13px',
                     fontWeight: '500',
                     lineHeight: '15px',
                     padding: '3px 30px !important'}}
                     variant="contained" color="success">
                       Person Data<br/>Entry
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