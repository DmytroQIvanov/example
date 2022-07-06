/* eslint-disable no-unsafe-optional-chaining */
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";

import { ColorLabel } from "./ColorLabel";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import ReusableComponent from "./ReusableComponent";
import ButtonsBlock from "./ButtonsBlock";
import { CREATE_PERSON, PERSON_DATA } from "../../shemas/PersonGraphqlShemas";

// const PERSON_DATA = gql`
//   query sample_query {
//     sample_person {
//       person_id
//       first_name
//       middle_names
//       last_name
//       nicknames
//       suffix
//       google_id
//       app_id
//       typeByType {
//         type_id
//         typename
//       }
//       date_created
//       date_modified
//       edited_by
//       last_email
//       disputes
//       user_accounts {
//         account_name
//         accountTypeByAccountType {
//           account_type_name
//         }
//         account_location
//         active_since
//         is_pm
//         can_email
//       }
//     }
//   }
// `;

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
  first_name: string | undefined;
  middle_names: string | undefined;
  last_name: string | undefined;
  nickname: string | undefined;
  suffix: string | undefined;
  nameSourceType: string | undefined;
  person_id: string | undefined;
  employee_id: string | undefined;
}

const initialObject = {
  first_name: "",
  middle_names: "",
  last_name: "",
  nickname: "",
  suffix: "",
  nameSourceType: "",
  person_id: "",
  employee_id: "",
};

const AccountMain = () => {
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [editStatus, setEditStatus] = React.useState(0);
  const [collapse, setCollapse] = React.useState(false);

  const router = useRouter();

  const [mutateFunction, { loading: creatingLoading }] =
    useMutation(CREATE_PERSON);

  const goTo = (id: string) => {
    if (router.pathname.includes("[id]")) {
      router.pathname = router.pathname.replace("[id]", id);
    } else {
      router.pathname = router.pathname + `/${id}`;
    }
    delete router.query.state;
    router.push(router);
  };
  useEffect(() => {
    if (router.query.state == "creating") {
      setCollapse(false);
      setPersonDataState(initialObject);
      setState(initialObject);
      setEditStatus(2);
    }
  }, [router.query.state]);

  useEffect(() => {
    if (router.query.state != "creating") setEditStatus(0);
  }, [router.query.id]);

  useEffect(() => {
    if (editStatus == 0 || editStatus == 1) {
      delete router.query.state;
      router.push(router);
    }
  }, [editStatus]);

  const [state, setState] = useState<valuesTypes>(initialObject);

  const [personDataState, setPersonDataState] =
    useState<valuesTypes>(initialObject);

  useEffect(() => {
    setState(personDataState);
  }, [editStatus, personDataState]);

  const onCreateUser = () => {
    if (state.first_name && state.last_name) {
      console.log(state);
      mutateFunction({ variables: state }).then((data) => {
        goTo(data.data.insert_person.returning[0].person_id);
        setEditStatus(0);
      });
    }
  };
  const {
    data: personData,
    error,
    loading,
  } = useQuery(PERSON_DATA, {
    skip: !router.query.id,
    variables: { pid: router.query.id },
  });
  useEffect(() => {
    if (personData?.person.length != 0 && !error) {
      setPersonDataState({
        ...personData?.person[0],
      });
    }
  }, [personData]);
  console.log(personData);

  // const data = "";
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

  const { data } = useQuery(PERSON_DATA);

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

  if (!router.query.id && editStatus != 2) {
    return <></>;
  }
  if (personData?.person.length == 0 || error)
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
        No User
      </Box>
    );

  const reusableComponentObject = {
    editStatus,
    personDataState,
    editableState: state,
    handleChangeEvent,
    handleChange,
    loading,
  };

  const buttonsBlockObject = {
    editStatus,
    collapse,
    handleCollapse,
    handleEditStatus,
    onSave,
    onCancel,
    onCreateUser,
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
                  <TableCell sx={{ textAlign: "left !important" }}>
                    {personDataState?.person_id}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "left !important", display: "flex" }}
                  >
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"last_name"}
                      coma
                    />
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"first_name"}
                      coma
                    />
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"middle_names"}
                      coma
                    />
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"nickname"}
                    />
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
              <Box sx={{ fontSize: "13px", p: "0 1px" }} key={key}>
                <ColorLabel type={key} text={elem} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <>
          <TableContainer sx={{ position: "relative" }}>
            {(loading || creatingLoading) && (
              <Box sx={{ position: "absolute", width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
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
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"first_name"}
                    />
                  </TableCell>
                  <TableCell>
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"middle_names"}
                    />
                  </TableCell>
                  <TableCell>
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"last_name"}
                    />
                  </TableCell>
                  <TableCell>
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"nickname"}
                    />
                  </TableCell>
                  <TableCell>
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"suffix"}
                    />
                  </TableCell>
                  <TableCell>
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"nameSourceType"}
                      type={"selectableList"}
                    />
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
                        <ReusableComponent
                          {...reusableComponentObject}
                          name={"person_id"}
                        />
                      </TableCell>
                      <TableCell>
                        <ReusableComponent
                          {...reusableComponentObject}
                          name={"employee_id"}
                        />
                      </TableCell>
                      <TableCell width={"200px"}>
                        <ReusableComponent
                          {...reusableComponentObject}
                          name={"personType"}
                          type={"selectableList"}
                        />
                        {/*{data?.sample_person[index].user_accounts.map(*/}
                        {/*  (*/}
                        {/*    { account_location }: { account_location?: Number },*/}
                        {/*    key: number*/}
                        {/*  ) => (*/}
                        {/*    <>*/}
                        {/*      {account_location}*/}
                        {/*      {index <*/}
                        {/*      data?.sample_person[index].user_accounts?.length -*/}
                        {/*        1*/}
                        {/*        ? ", "*/}
                        {/*        : ""}*/}
                        {/*    </>*/}
                        {/*  )*/}
                        {/*)}*/}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {editStatus != 2 && (
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
              )}
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
      <ButtonsBlock {...buttonsBlockObject} />
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
