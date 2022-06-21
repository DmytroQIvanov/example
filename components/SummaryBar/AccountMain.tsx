/* eslint-disable no-unsafe-optional-chaining */
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import * as React from "react";

import { ColorLabel } from "./ColorLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const PERSON_DATA = gql`
  query sample_query {
    sample_person {
      person_id
      first_name
      middle_names
      last_name
      nicknames
      suffix
      google_id
      app_id
      typeByType {
        type_id
        typename
      }
      date_created
      date_modified
      edited_by
      last_email
      disputes
      user_accounts {
        account_name
        accountTypeByAccountType {
          account_type_name
        }
        account_location
        active_since
        is_pm
        can_email
      }
    }
  }
`;

const row1Title = {
  fname: "First Name",
  mname: "Middle Names",
  lname: "Last Name",
  nname: "Nick Name",
  name: "Name",
  sufix: "Suffix",
  gid: "Name Source Type",
  cohort: "Cohort",
};
const row2Title = {
  aid: "Person ID",
  cid: "Employee ID",
  type: "Person Type",
};
const options = [{ label: "The Godfather" }, { label: "Pulp Fiction" }];
const row3Title = {
  dateCreated: "Date Created",
  dateEdited: "Date Edited",
  editedBy: "Edited By",
  lemail: "Last EE List",
  disputes: "DF",
};
const rowSubTitle = {
  name: "Sub Account Name",
  type: "Sub Account Type",
  location: "Location",
  activeDate: "Active since",
  pmStatus: "Is PM",
  canEmail: "Can Email",
};

const textOnLabels = [
  "Card Status",
  "Unit Status",
  "VCAP",
  "Left UC",
  "Organized",
];
interface valuesTypes {
  firstName: string | undefined;
  middleNames: string | undefined;
  lastName: string | undefined;
  nickName: string | undefined;
  suffix: string | undefined;
  nameSourceType: string | undefined;
  personId: string | undefined;
  employeeId: string | undefined;
}

const AccountMain = () => {
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [editStatus, setEditStatus] = React.useState(0);
  const [collapse, setCollapse] = React.useState(false);

  const [state, setState] = useState<valuesTypes>({
    firstName: "1",
    middleNames: "2",
    lastName: "3",
    nickName: "4",
    suffix: "5",
    nameSourceType: "6",
    personId: "7",
    employeeId: "8",
  });

  function handleChangeEvent(event: React.ChangeEvent<any>) {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value as string,
    });
  }

  function handleChange(name: string, text: string | number) {
    setState({
      ...state,
      [name]: text.toString(),
    });
  }

  const { data, loading } = useQuery(PERSON_DATA);

  const [personDataState, setPersonDataState] = useState<valuesTypes>({
    firstName: "1",
    middleNames: "2",
    lastName: "3",
    nickName: "4",
    suffix: "5",
    nameSourceType: "6",
    personId: "7",
    employeeId: "8",
  });

  const handleIndex = (direction: string) => {
    if (direction === "prev") {
      if (index > 0) {
        setIndex(index - 1);
      }
    } else if (direction === "next") {
      if (index + 1 < data?.sample_person.length) {
        setIndex(index + 1);
      }
    }
    setEditStatus(0);
    setSubIndex(0);
  };
  const handleSubIndex = () => {
    if (subIndex + 1 < data?.sample_person[index].user_accounts.length) {
      setSubIndex(subIndex + 1);
    } else {
      setSubIndex(0);
    }
  };
  const handleEditStatus = () => {
    setEditStatus(1);
  };
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const onSave = () => {
    setPersonDataState(state);
    setEditStatus(0);
  };
  const onCancel = () => {
    setState(personDataState);
    setEditStatus(0);
  };

  return (
    <Box
      sx={{
        p: 1,
        m: 2,
        border: "1px solid #000",
        borderRadius: "5px",
      }}
      className="account_main"
    >
      {collapse ? (
        <Box sx={{ display: "flex" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>{row2Title.aid}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{row1Title.name}</strong>
                  </TableCell>

                  <TableCell>
                    <strong>{row1Title.cohort}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{row2Title.type}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{rowSubTitle.location}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{data?.sample_person[index]?.app_id}</TableCell>
                  <TableCell>
                    {`${data?.sample_person[index].last_name}, ${data?.sample_person[index].first_name} ${data?.sample_person[index].middle_names} ${data?.sample_person[index].nicknames}`}
                  </TableCell>
                  <TableCell>
                    {data?.sample_person[index].typeByType?.typename}
                  </TableCell>
                  <TableCell>
                    {data?.sample_person[index].user_accounts.map(
                      (
                        { account_location }: { account_location?: Number },
                        key: number
                      ) => (
                        <span key={`${account_location || key}`}>
                          <span>{`${account_location}`}</span>
                          <span>
                            {index <
                            data?.sample_person[index].user_accounts?.length - 1
                              ? ", "
                              : ""}
                          </span>
                        </span>
                      )
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
              marginTop: "35px",
            }}
          >
            {textOnLabels.map((elem, key) => (
              <Box sx={{ fontSize: "13px", p: "0 1px" }}>
                <ColorLabel type={key} text={elem} key={key} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>{row1Title.fname}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{row1Title.mname}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{row1Title.lname}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{row1Title.nname}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{row1Title.sufix}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{row1Title.gid}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={styles.tableRow}>
                  <TableCell>
                    {editStatus ? (
                      <TextField
                        defaultValue={personDataState?.firstName}
                        variant="outlined"
                        onChange={handleChangeEvent}
                        name={"firstName"}
                        value={state["firstName"]}
                      />
                    ) : (
                      personDataState?.firstName
                    )}
                  </TableCell>
                  <TableCell>
                    {editStatus ? (
                      <TextField
                        defaultValue={personDataState?.middleNames}
                        variant="outlined"
                        onChange={handleChangeEvent}
                        name={"middleNames"}
                        value={state["middleNames"]}
                      />
                    ) : (
                      personDataState?.middleNames
                    )}
                  </TableCell>
                  <TableCell>
                    {editStatus ? (
                      <TextField
                        defaultValue={personDataState?.lastName}
                        variant="outlined"
                        onChange={handleChangeEvent}
                        name={"lastName"}
                        value={state["lastName"]}
                      />
                    ) : (
                      personDataState?.lastName
                    )}
                  </TableCell>
                  <TableCell>
                    {editStatus ? (
                      <TextField
                        defaultValue={personDataState?.lastName}
                        variant="outlined"
                        onChange={handleChangeEvent}
                        name={"nickName"}
                        value={state["nickName"]}
                      />
                    ) : (
                      personDataState?.nickName
                    )}
                  </TableCell>
                  <TableCell>
                    {editStatus ? (
                      <TextField
                        defaultValue={personDataState?.suffix}
                        variant="outlined"
                        onChange={handleChangeEvent}
                        name={"suffix"}
                        value={state["suffix"]}
                      />
                    ) : (
                      personDataState?.suffix
                    )}
                  </TableCell>
                  <TableCell>
                    {editStatus ? (
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {/*Name Source Type*/}
                        </InputLabel>
                        <Select
                          onChange={(event, child) =>
                            handleChange("nameSourceType", event.target.value)
                          }
                          name={"nameSourceType"}
                          value={state["nameSourceType"]}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      personDataState?.nameSourceType
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className={styles.tableRow}>
                      <TableCell>
                        <strong>{row2Title.aid}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{row2Title.cid}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{row2Title.type}</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={styles.tableRow}>
                      <TableCell>
                        {editStatus ? (
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={options}
                            onChange={(data) =>
                              handleChange(
                                "personId",
                                // @ts-ignore
                                options[data.target.value].label
                              )
                            }
                            value={{ label: state["personId"] }}
                            sx={{ width: 170 }}
                            renderInput={(params) => (
                              <TextField {...params} label="" />
                            )}
                          />
                        ) : (
                          personDataState?.personId
                        )}
                      </TableCell>
                      <TableCell>
                        {editStatus ? (
                          <>
                            <TextField
                              defaultValue={
                                data?.sample_person[index].employeeId
                              }
                              variant="outlined"
                              onChange={handleChangeEvent}
                              name={"employeeId"}
                              value={state["employeeId"]}
                            />
                          </>
                        ) : (
                          personDataState.employeeId
                        )}
                      </TableCell>
                      <TableCell>
                        {data?.sample_person[index].user_accounts.map(
                          (
                            { account_location }: { account_location?: Number },
                            key: number
                          ) => (
                            <>
                              {account_location}
                              {index <
                              data?.sample_person[index].user_accounts?.length -
                                1
                                ? ", "
                                : ""}
                            </>
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className={styles.tableRow}>
                      <TableCell>
                        <strong>{row3Title.dateCreated}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{row3Title.dateEdited}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{row3Title.editedBy}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{row3Title.lemail}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{row3Title.disputes}</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={styles.tableRow}>
                      <TableCell>
                        {data?.sample_person[index].date_created}
                      </TableCell>
                      <TableCell>
                        {data?.sample_person[index].date_modified}
                      </TableCell>
                      <TableCell>
                        {data?.sample_person[index].edited_by}
                      </TableCell>
                      <TableCell>
                        {data?.sample_person[index].last_email}
                      </TableCell>
                      <TableCell>
                        {data?.sample_person[index].disputes}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px",
                }}
              >
                {textOnLabels.map((elem, key) => (
                  <ColorLabel type={key} text={elem} key={key} />
                ))}
              </Box>
            </Box>
            {data?.sample_person[index].user_accounts.length > 0 ? (
              <Box
                sx={{
                  p: 1,
                  m: 2,
                  border: "1px solid #000",
                  borderRadius: "5px",
                  flex: 1,
                }}
              >
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.name}: </strong>
                          {
                            data?.sample_person[index].user_accounts[subIndex]
                              ?.account_name
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.type}: </strong>
                          {
                            data?.sample_person[index].user_accounts[subIndex]
                              ?.accountTypeByAccountType?.account_type_name
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.location}: </strong>
                          {
                            data?.sample_person[index].user_accounts[subIndex]
                              ?.account_location
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.activeDate}: </strong>
                          {
                            data?.sample_person[index].user_accounts[subIndex]
                              ?.active_since
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.pmStatus}: </strong>
                          {data?.sample_person[index].user_accounts[subIndex]
                            ?.is_pm
                            ? "Yes"
                            : "No"}
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.canEmail}: </strong>
                          {data?.sample_person[index].user_accounts[subIndex]
                            ?.can_email
                            ? "Yes"
                            : "No"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    textAlign: "center",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSubIndex()}
                >
                  {subIndex + 1} of{" "}
                  {data?.sample_person[index].user_accounts?.length} &gt;
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 1,
                  m: 2,
                  border: "1px solid #000",
                  borderRadius: "5px",
                  flex: 1,
                  display: "flex",
                }}
              >
                {loading ? (
                  <Box sx={{ m: "auto", fontWeight: 600, color: "black" }}>
                    <span>Loading...</span>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      m: "auto",
                      fontWeight: 600,
                      color: "black",
                    }}
                  >
                    <span>No Campus Affiliations</span>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </>
      )}
      <Box sx={{ m: 2, textAlign: "center" }}>
        {!editStatus ? (
          <>
            {!collapse && (
              <Button
                style={{
                  marginRight: 10,
                }}
                variant="contained"
                onClick={() => handleEditStatus()}
              >
                Edit
              </Button>
            )}
            <Button
              style={{
                backgroundColor: "#6BAD43",
              }}
              variant="contained"
              onClick={() => handleCollapse()}
            >
              {collapse ? "Expand" : "Collapse"}
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{
                marginRight: 10,
              }}
              variant="contained"
              onClick={() => onSave()}
            >
              Save
            </Button>
            <Button
              style={{
                // backgroundColor: "#6BAD43",
                backgroundColor: "#AA2B2B",
              }}
              variant="contained"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {index > 0 ? (
            <Box
              sx={{
                textAlign: "center",
                padding: "20px",
                cursor: "pointer",
              }}
              onClick={() => handleIndex("prev")}
            >
              &lt; Previous
            </Box>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={6}>
          {index + 1 < data?.sample_person.length ? (
            <Box
              sx={{
                textAlign: "center",
                padding: "20px",
                cursor: "pointer",
              }}
              onClick={() => handleIndex("next")}
            >
              Next &gt;
            </Box>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountMain;
