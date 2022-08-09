import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { NativeSelect, FormControl, Button } from "@mui/material";

import SearchMenu from "../../Search/SearchBox";
import { ConfTemplate } from "../../Configuration/Type";
import { BootstrapInput } from "../../Search/Type";
import { PersonHeaderController } from "./PersonHeader.controller";
import DropDown from "./DropDown";

import styles from "./styles.module.scss";
import { gql } from "@apollo/client";

const SEARCH_PERSON = gql`
  query person_search($search: String!) {
    fuzzy_search(args: { search_text: $search }) {
      person_id
      full_name
      employee_id
    }
  }
`;
export default function Index() {
  const {
    onAddNewPerson,
    dropbarLists: { person, campus },
  } = PersonHeaderController();

  return (
    <>
      <div className="header_container"> </div>

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
                  <DropDown
                    list={campus.list}
                    title={"Campus"}
                    handleClick={() => {}}
                    selectedValue={1}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container>
                <Grid item sm={12}>
                  <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                    <SearchMenu
                      search={{ schema: SEARCH_PERSON, name: "fuzzy_search" }}
                    />
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
                  <DropDown
                    list={person.list}
                    title={"Person Category"}
                    handleClick={() => {}}
                    selectedValue={1}
                  />
                </Grid>
                <Grid item sm={4}>
                  <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        onAddNewPerson();
                      }}
                      className={styles.addBtn}
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
