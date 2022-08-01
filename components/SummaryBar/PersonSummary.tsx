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
} from "../../schemas/PersonGraphqlShcemas";
import { dateOptions } from "../Tables/TablesComponents/EditableBlock/Components/dateOptions";
import { PERSON_RESEARCH_QUERY } from "../../schemas/PersonResearch";
import CollapsedPersonSummary from "./CollapsedPersonSummary";
import SideComponent from "./SideComponent";

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
    campus: {
      campus_name: string;
    };
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

const PersonSummary = () => {
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
    router.push(href).then(() => {
      setEditStatus(0);
    });
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
  };

  const {
    data: personData,
    error,
    loading: fetchLoading,
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
  }, [error, personData]);

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
      } else {
        object = { ...object, [name]: value };
      }
    });
    return object;
  };

  const handleChangeArray = (
    data: {
      name: string;
      value: string | number | boolean | Date;
    }[]
  ) => {
    setState((prevState: any) => {
      const state = func3(
        data.map((elem) => {
          return { ...elem, prevState };
        })
      );
      return state;
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
    loading: fetchLoading,
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
        <CollapsedPersonSummary
          {...{
            row2Title,
            row1Title,
            rowSubTitle,
            personDataState,
            reusableComponentObject,
            data,
            index,
            textOnLabels,
            subIndex,
          }}
        />
      ) : (
        <>
          <TableContainer sx={{ position: "relative" }}>
            {(fetchLoading || creatingLoading || updatingLoading) && (
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
                  <TableCell>{/*Name Source Type*/}</TableCell>
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
                          editable={false}
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
                            type={"date"}
                          />
                        </TableCell>
                        <TableCell>
                          <ReusableComponent
                            {...reusableComponentObject}
                            name={"date_modified"}
                            editable={false}
                            type={"date"}
                          />
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
            <SideComponent
              {...{
                personDataState,
                rowSubTitle,
                subIndex,
                data,
                handleSubIndex,
                fetchLoading,
                goTo1,
              }}
            />
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

export default PersonSummary;
