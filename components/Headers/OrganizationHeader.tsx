import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
  NativeSelect,
  FormControl,
  Button,
} from '@mui/material';

import SearchMenu from '../Search/SearchBox';
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
                    name="campus"
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
                    name="org_name"
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