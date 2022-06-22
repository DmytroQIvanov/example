import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { NativeSelect, FormControl, Button } from "@mui/material";

import SearchMenu from "../Search/SearchBox";
import { ConfTemplate } from "../Configuration/Type";
import { BootstrapInput } from "../Search/Type";

export function PiDataEntryHeader() {
  return (
    <div className="header">
      <Box>
        <Grid container>
          <Grid item sm={8}>
            <Grid container>
              <Grid item sm={3}>
                <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                  <NativeSelect
                    id="campus-id"
                    name="campus"
                    size="small"
                    input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">
                      Campus
                    </option>
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item sm={9}>
                <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                  <SearchMenu />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <Grid container>
              <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                  <NativeSelect
                    id="fullname-id"
                    name="fullname"
                    size="small"
                    input={<BootstrapInput />}
                  >
                    <option className="default-option" value="">
                      Last, First
                    </option>
                    {ConfTemplate.campus &&
                      ConfTemplate.campus.map((item, itemIndex) => {
                        return <option value={item} key={itemIndex}>{item}</option>;
                      })}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                  <Button
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                      lineHeight: "15px",
                      padding: "3px 30px !important",
                    }}
                    variant="contained"
                    color="success"
                  >
                    Person Data
                    <br />
                    Entry
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
