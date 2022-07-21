import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { NativeSelect, FormControl, Button } from "@mui/material";

import SearchMenu from "../Search/SearchBox";
import { ConfTemplate } from "../Configuration/Type";
import { BootstrapInput } from "../Search/Type";
import { useRouter } from "next/router";

export function PersonDataEntryHeader() {
  const router = useRouter();

  const onAddNewPerson = () => {
    // if (router.pathname.includes("[id]")) {
    //   router.pathname = router.pathname.replace("/[id]", "");
    // } else {
    //   // href += router.pathname + `/${id}`;
    // }

    router.pathname = "/persondataentry";
    router.query.state = "creating";
    delete router.query.id;
    router.push(router);
  };
  return (
    <>
      <div className="header_container" />
      <div className="header">
        <Box>
          <Grid container>
            <Grid item sm={3}>
              <Grid container>
                <Grid item sm={6}>
                  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                    <Button
                      sx={[
                        {
                          background: "white",
                          color: "#134A90",
                        },
                        {
                          "&:hover": {
                            background: "#efefef",
                          },
                        },
                      ]}
                      variant="contained"
                    >
                      Show Similar
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
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
                      {ConfTemplate.campus &&
                        ConfTemplate.campus.map((item, itemIndex) => {
                          return (
                            <option value={item} key={itemIndex}>
                              {item}
                            </option>
                          );
                        })}
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container>
                <Grid item sm={12}>
                  <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                    <SearchMenu />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={5}>
              <Grid container>
                <Grid item sm={4}>
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
                          return (
                            <option value={item} key={itemIndex}>
                              {item}
                            </option>
                          );
                        })}
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item sm={4}>
                  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                    <NativeSelect
                      id="person-id"
                      name="person"
                      size="small"
                      input={<BootstrapInput />}
                    >
                      <option className="default-option" value="">
                        Person Category
                      </option>
                      {ConfTemplate.campus &&
                        ConfTemplate.campus.map((item, itemIndex) => {
                          return (
                            <option value={item} key={itemIndex}>
                              {item}
                            </option>
                          );
                        })}
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item sm={4}>
                  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        onAddNewPerson();
                      }}
                    >
                      Add New Person
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
