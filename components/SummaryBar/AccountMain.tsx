/* eslint-disable no-unsafe-optional-chaining */
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Collapse,
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
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import ReusableComponent from "./ReusableComponent";
import ButtonsBlock from "./ButtonsBlock";
import {
  CREATE_PERSON,
  PERSON_DATA,
  PERSON_TYPE_QUERY,
  UPDATE_PERSON,
} from "../../shemas/PersonGraphqlShemas";
import { dateOptions } from "../Tables/TablesComponents/EditableBlock/Components/dateOptions";
import { PERSON_RESEARCH_QUERY } from "../../shemas/PersonResearch";

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
const row3Title = {
  dateCreated: "Date Created",
  dateEdited: "Date Edited",
  editedBy: "Edited By",
  lemail: "Last EE List",
  disputes: "DF",
};
const rowSubTitle = {
  name: "Campus Name",
  type: "Area",
  location: "Super Area",
  activeDate: "Turf",
  pmStatus: "Active Appointment?",
  canEmail: "is PI?",
  dfkv: "DLKNV",
};

// const rowSubTitle = {
//   name: "Sub Account Name",
//   type: "Sub Account Type",
//   location: "Location",
//   activeDate: "Active since",
//   pmStatus: "Is PM",
//   canEmail: "Can Email",
// };

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
  nick_name: string | undefined;
  suffix: string | undefined;
  nameSourceType: string | undefined;
  person_id: string | undefined;
  employee_id: string | undefined;
  person_type: { id: string; person_type: string };
  person_campuses: {
    area: {
      area_id: number;
      area: string;
      super_area: {
        super_area_id: number;
        super_area: string;
      };
    };
    turfid: number;
    is_pi: boolean;
    date_last_known_valid: string;
  }[];
}
// middle_names

const initialObject = {
  first_name: "",
  middle_names: "",
  last_name: "",
  nickname: "",
  suffix: "",
  nameSourceType: "",
  person_id: "",
  employee_id: "",
  person_campuses: [],
  person_type: { id: null, person_type: "" },
};

const AccountMain = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [editStatus, setEditStatus] = useState(0);
  const [collapse, setCollapse] = useState(false);

  const [alertSuccessPopup, setAlertSuccessPopup] = useState(false);
  const [alertErrorPopup, setAlertErrorPopup] = useState(false);

  useEffect(() => {
    if (alertSuccessPopup) {
      setTimeout(() => {
        setAlertSuccessPopup(false);
      }, 4000);
    }
  }, [alertSuccessPopup]);

  useEffect(() => {
    if (alertErrorPopup) {
      setTimeout(() => {
        setAlertErrorPopup(false);
      }, 4000);
    }
  }, [alertErrorPopup]);

  const router = useRouter();

  const [mutateFunction, { loading: creatingLoading, error: creatingError }] =
    useMutation(CREATE_PERSON);
  console.log(creatingError);

  const [updateFunction, { loading: updatingLoading }] =
    useMutation(UPDATE_PERSON);
  const goTo = (id: string) => {
    if (router.pathname.includes("[id]")) {
      router.pathname = router.pathname.replace("[id]", id);
    } else {
      router.pathname = router.pathname + `/${id}`;
    }
    delete router.query.state;
    router.push(router);
  };
  const goTo1 = (path: string) => {
    let href = path + `/${router.query.id}`;
    router.push(href);
  };
  useEffect(() => {
    if (router.query.state === "creating") {
      setCollapse(false);
      setPersonDataState(initialObject);
      setState(initialObject);
      setEditStatus(2);
    }
  }, [router.query.state]);

  useEffect(() => {
    if (router.query.state !== "creating") setEditStatus(0);
  }, [router.query.id]);

  // useEffect(() => {
  //   if (editStatus == 0 || editStatus == 1) {
  //     delete router.query.state;
  //     router.push(router);
  //   }
  // }, [editStatus]);

  const [state, setState] = useState<valuesTypes>(initialObject);

  const [personDataState, setPersonDataState] =
    useState<valuesTypes>(initialObject);

  useEffect(() => {
    setState(personDataState);
  }, [editStatus, personDataState]);

  const onCreateUser = () => {
    if (state.first_name && state.last_name) {
      console.log(state);
      mutateFunction({
        variables: { ...state, person_type: state.person_type.id },
      })
        .then((data) => {
          setAlertSuccessPopup(true);
          setTimeout(() => {
            goTo(data.data.insert_person.returning[0].person_id);
            setEditStatus(0);
            setState(initialObject);
          }, 3000);
        })
        .catch((e) => {
          console.log(e);
          setAlertErrorPopup(true);
        });
    } else {
      setAlertErrorPopup(true);
    }
  };
  const onUpdateUser = () => {
    // if (state.first_name && state.last_name) {
    console.log(state);
    updateFunction({
      variables: {
        ...state,
        // first_name: state.first_name,
        // changed_by: "Dmytro",
        pid: router.query.id,
        person_type: state.person_type.id,
      },
    })
      .then((data) => {
        setAlertSuccessPopup(true);
        setTimeout(() => {
          // goTo(data.data.insert_person.returning[0].person_id);
          setEditStatus(0);
          refetch();
          // setState(initialObject);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setAlertErrorPopup(true);
      });
    // } else {
    //   setAlertErrorPopup(true);
    // }
  };

  const {
    data: personData,
    error,
    loading,
    refetch,
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

  const { data: personTypeData } = useQuery(PERSON_TYPE_QUERY);

  const [personTypeArray, setPersonTypeArray] = useState<any[]>([]);
  useEffect(() => {
    personTypeData?.person_type &&
      setPersonTypeArray(
        personTypeData?.person_type.map((elem: any) => {
          return { label: elem.person_type, id: elem.id };
        })
      );
  }, [personTypeData]);

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

  const func3 = (
    data: {
      prevState: any;
      value: any;
      name: string;
    }[]
  ) => {
    let object = data[0].prevState;
    console.log(data[0]);

    data.forEach(({ prevState, value, name }) => {
      const result = name.toString().split(".");
      if (result.length === 2) {
        object = {
          ...object,
          [result[0]]: { ...object[result[0]], [result[1]]: value },
        };
      } else if (result.length === 3) {
        object = {
          ...object,
          [result[0]]: {
            ...object[result[0]],
            [result[1]]: {
              ...object[result[0]][result[1]],
              [result[2]]: value,
            },
          },
        };
        console.log("object", object);
      } else {
        object = { ...object, [name]: value };
      }
    });
    console.log("object2", object);
    return object;
  };

  const handleChangeArray = (
    data: {
      name: string;
      value: string | number | boolean | Date;
    }[]
  ) => {
    setState((prevState: any) => {
      console.log("///");
      console.log(prevState);
      console.log(
        func3(
          data.map((elem) => {
            return { ...elem, prevState };
          })
        )
      );
      return func3(
        data.map((elem) => {
          return { ...elem, prevState };
        })
      );
      // return prevState;
    });
  };

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
    if (subIndex + 1 < personDataState?.person_campuses?.length) {
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
    onUpdateUser();
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
    personDataState: state,
    editableState: state,
    handleChangeEvent,
    handleChange,
    loading,
    handleChangeArray,
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

  console.log(personData);
  console.log(personTypeArray);
  return (
    <Box
      sx={{
        p: 1,
        m: 2,
        border: "1px solid #000",
        borderRadius: "5px",
        position: "relative",
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
                      name={"nick_name"}
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
                      name={"nick_name"}
                    />
                  </TableCell>
                  <TableCell>
                    <ReusableComponent
                      {...reusableComponentObject}
                      name={"suffix"}
                    />
                  </TableCell>
                  <TableCell>
                    {/*<ReusableComponent*/}
                    {/*  {...reusableComponentObject}*/}
                    {/*  name={"person_type"}*/}
                    {/*  idName={"person_type_id"}*/}
                    {/*  type={"selectableList"}*/}
                    {/*  list={personTypeArray}*/}
                    {/*/>*/}
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
                          name={"person_type.person_type"}
                          idName={"person_type.id"}
                          type={"selectableList"}
                          list={personTypeArray}
                        />
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
                        <TableCell width={"160px"}>
                          <strong>{row3Title.editedBy}</strong>
                        </TableCell>
                        {/*<TableCell>*/}
                        {/*  <strong>{row3Title.lemail}</strong>*/}
                        {/*</TableCell>*/}
                        {/*<TableCell>*/}
                        {/*  <strong>{row3Title.disputes}</strong>*/}
                        {/*</TableCell>*/}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className={styles.tableRow}>
                        <TableCell>
                          <ReusableComponent
                            {...reusableComponentObject}
                            name={"date_added"}
                            editable={false}
                          />
                          {/*{data?.sample_person[index].date_created}*/}
                        </TableCell>
                        <TableCell>
                          <ReusableComponent
                            {...reusableComponentObject}
                            name={"date_modified"}
                            editable={false}
                          />
                          {/*{data?.sample_person[index].date_modified}*/}
                        </TableCell>
                        <TableCell>
                          <ReusableComponent
                            {...reusableComponentObject}
                            name={"modified_by"}
                            editable={false}
                          />
                        </TableCell>
                        {/*<TableCell>*/}
                        {/*  {data?.sample_person[index].last_email}*/}
                        {/*</TableCell>*/}
                        {/*<TableCell>*/}
                        {/*  {data?.sample_person[index].disputes}*/}
                        {/*</TableCell>*/}
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
            {personDataState?.person_campuses?.length >= 1 ? (
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
                            personDataState?.person_campuses[subIndex]?.area
                              ?.area
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.type}: </strong>
                          {
                            personDataState?.person_campuses[subIndex]?.area
                              ?.area
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.location}: </strong>
                          {
                            personDataState?.person_campuses[subIndex]?.area
                              ?.super_area?.super_area
                          }
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.activeDate}: </strong>
                          {personDataState?.person_campuses[subIndex]?.turfid}
                          {/*{personDataState?.first_name}{" "}*/}
                          {/*{personDataState?.middle_name}{" "}*/}
                          {/*{personDataState?.last_name}*/}
                        </TableCell>
                      </TableRow>
                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <strong>{rowSubTitle.pmStatus}: </strong>
                          {data?.sample_person[subIndex].user_accounts[subIndex]
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
                          {data?.sample_person[subIndex].user_accounts[subIndex]
                            ?.can_email
                            ? "Yes"
                            : "No"}
                        </TableCell>
                      </TableRow>

                      <TableRow className={styles.tableRow}>
                        <TableCell
                          style={{ paddingTop: 10, paddingBottom: 10 }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: "0px 20px",
                              paddingBottom: "15px",
                            }}
                          >
                            <strong>{rowSubTitle.dfkv}: </strong>
                            {(() => {
                              const date = new Date(
                                personDataState?.person_campuses[
                                  subIndex
                                ]?.date_last_known_valid
                              );
                              return (
                                <>
                                  {date?.toLocaleString("en-US", dateOptions)}
                                </>
                              );
                            })()}

                            <Box
                              sx={{
                                textAlign: "right",
                                m: "auto 0px auto auto",
                                color: "#0400ff",
                                cursor: "pointer",
                              }}
                              className={"disable-select"}
                              onClick={() => handleSubIndex()}
                            >
                              {(() => {
                                if (
                                  personDataState?.person_campuses?.length == 1
                                )
                                  return (
                                    <>
                                      {personDataState?.person_campuses?.length}
                                    </>
                                  );
                                return (
                                  <>
                                    {subIndex + 1} of{" "}
                                    {personDataState?.person_campuses?.length}{" "}
                                    &gt;
                                  </>
                                );
                              })()}
                            </Box>
                          </Box>
                          <Button
                            style={{
                              backgroundColor: "#6BAD43",
                              height: "30px",
                              fontSize: "14px",
                            }}
                            variant="contained"
                            onClick={() => goTo1("/persondataentry/research/")}
                          >
                            Campus Data Entry
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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

      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "10px",
          transform: "translate(-50%, 0)",
        }}
      >
        <Collapse in={alertErrorPopup}>
          <Alert
            onClose={() => setAlertErrorPopup(false)}
            severity="error"
            sx={{
              mb: "15px",
            }}
          >
            Sorry, something went wrong
          </Alert>
        </Collapse>
        <Collapse in={alertSuccessPopup}>
          <Alert onClose={() => setAlertSuccessPopup(false)}>
            The person was created successfully!
          </Alert>
        </Collapse>
      </Box>
    </Box>
  );
};

export default AccountMain;
