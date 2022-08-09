import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { NativeSelect, FormControl, Button } from "@mui/material";

import SearchMenu from "../Search/SearchBox";
import { ConfTemplate } from "../Configuration/Type";
import { BootstrapInput } from "../Search/Type";
import { LOCATION_BUILDING_QUERY } from "../../schemas/LocationHeaderSchemas";

export function LocationDataEntryHeader() {
  return (
    <div className="header">
      <Box>
        <Grid container>
          <Grid item>
            {/*<Grid container>*/}
            {/*<Grid item sm={3}>*/}
            <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
              <NativeSelect
                id="fullname-id"
                name="fullname"
                size="small"
                input={<BootstrapInput />}
              >
                <option className="default-option" value="">
                  Campus
                </option>
                {ConfTemplate?.campus?.map((item, itemIndex) => {
                  // eslint-disable-next-line react/jsx-key
                  return <option value={item}>{item}</option>;
                })}
              </NativeSelect>
            </FormControl>
            {/*</Grid>*/}
            {/*</Grid>*/}
          </Grid>
          <Grid item sm={7}>
            {/*<Grid container>*/}
            <Grid container>
              <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                  <SearchMenu
                    placeholder={"Search by"}
                    searchTitle={[
                      "Building Name",
                      "Building id",
                      "Acronym",
                      "Sector",
                    ]}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                  <SearchMenu
                    placeholder={"Search by"}
                    searchTitle={[
                      { label: "Name", valueName: "building_name" },
                      { label: "Campus", valueName: "campus.campus_name" },
                      { label: "Acronym", valueName: "building_acronym" },
                      { label: "Sector", valueName: "sector" },
                      { label: "ID", valueName: "building_id", id: true },
                    ]}
                    search={{
                      schema: LOCATION_BUILDING_QUERY,
                      name: "building_fuzzy_search",
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/*<Grid item sm={3}>*/}
            {/*  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">*/}
            {/*    <NativeSelect*/}
            {/*      id="fullname-id"*/}
            {/*      name="fullname"*/}
            {/*      size="small"*/}
            {/*      input={<BootstrapInput />}*/}
            {/*    >*/}
            {/*      <option className="default-option" value="">*/}
            {/*        Organization Name*/}
            {/*      </option>*/}
            {/*      {ConfTemplate?.campus?.map((item) => {*/}
            {/*        // eslint-disable-next-line react/jsx-key*/}
            {/*        return <option value={item}>{item}</option>;*/}
            {/*      })}*/}
            {/*    </NativeSelect>*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}

            {/*<Grid item sm={3}>*/}
            {/*  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">*/}
            {/*    <NativeSelect*/}
            {/*      id="person-id"*/}
            {/*      name="person"*/}
            {/*      size="small"*/}
            {/*      input={<BootstrapInput />}*/}
            {/*    >*/}
            {/*      <option className="default-option" value="">*/}
            {/*        Org type*/}
            {/*      </option>*/}
            {/*      {ConfTemplate?.campus?.map((item) => {*/}
            {/*        // eslint-disable-next-line react/jsx-key*/}
            {/*        return <option value={item}>{item}</option>;*/}
            {/*      })}*/}
            {/*    </NativeSelect>*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}
            {/*<Grid item sm={3}>*/}
            {/*  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">*/}
            {/*    <Button variant="contained" color="success">*/}
            {/*      Add New Organization*/}
            {/*    </Button>*/}
            {/*  </FormControl>*/}
            {/*</Grid>*/}
          </Grid>
          {/*</Grid>*/}
        </Grid>
      </Box>
    </div>
  );
}
