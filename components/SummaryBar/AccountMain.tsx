/* eslint-disable no-unsafe-optional-chaining */
import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import * as React from 'react';

import { ColorLabel } from './ColorLabel';

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
  fname: 'First Name',
  mname: 'Middle Names',
  lname: 'Last Name',
  nname: 'Nick Name',
  name: 'Name',
  sufix: 'Suffix',
  gid: 'Google Ads ID',
};
const row2Title = {
  aid: 'App ID',
  cid: 'Client ID',
  type: 'Type',
};
const row3Title = {
  dateCreated: 'Date Created',
  dateEdited: 'Date Edited',
  editedBy: 'Edited By',
  lemail: 'Last Email',
  disputes: 'Disputes',
};
const rowSubTitle = {
  name: 'Sub Account Name',
  type: 'Sub Account Type',
  location: 'Location',
  activeDate: 'Active since',
  pmStatus: 'Is PM',
  canEmail: 'Can Email',
};

const AccountMain = () => {
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [editStatus, setEditStatus] = React.useState(0);
  const [collapse, setCollapse] = React.useState(true);

  const { data } = useQuery(PERSON_DATA);

  const handleIndex = (direction: string) => {
    if (direction === 'prev') {
      if (index > 0) {
        setIndex(index - 1);
      }
    } else if (direction === 'next') {
      if (index + 1 < data?.sample_person.length) {
        setIndex(index + 1);
      }
    }
    setEditStatus(0);
  };
  const handleSubIndex = () => {
    if (subIndex + 1 < data?.sample_person[index].user_accounts.length) {
      setSubIndex(subIndex + 1);
    }
  };
  const handleEditStatus = () => {
    setEditStatus(1);
  };
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <Box>
      <Box
        sx={{
          pt: 2,
          textAlign: 'center'
        }}
      >
        <Button
          style={{
            backgroundColor: '#6BAD43',
          }}
          variant="contained"
          onClick={() => handleCollapse()}
        >
          {collapse ? 'Expand' : 'Collapse'}
        </Button>
      </Box>
      <Box
        sx={{
          p: 1,
          m: 2,
          border: '1px solid #000',
          borderRadius: '5px',
        }}
      >
        {collapse ? (
          <Box sx={{ display: 'flex' }}>
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
                      <strong>{row2Title.type}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{rowSubTitle.location}</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>A</TableCell>
                    <TableCell>
                      {`${data?.sample_person[index].last_name}, ${data?.sample_person[index].first_name} ${data?.sample_person[index].middle_names} ${data?.sample_person[index].nicknames}`}
                    </TableCell>
                    <TableCell>
                      {data?.sample_person[index].typeByType?.typename}
                    </TableCell>
                    <TableCell>
                      {data?.sample_person[index].user_accounts.map(
                        ({ account_location }: { account_location?: Number }) => (
                          <span key={account_location}>
                            {account_location}
                            {index <
                            data?.sample_person[index].user_accounts?.length - 1
                              ? ', '
                              : ''}
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
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '35px',
              }}
            >
              <ColorLabel type={1} />
              <ColorLabel type={2} />
              <ColorLabel type={3} />
              <ColorLabel type={4} />
              <ColorLabel type={5} />
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
                  <TableRow>
                    <TableCell>
                      {editStatus ? (
                        <TextField
                          defaultValue="B"
                          variant="outlined"
                        />
                      ) : (
                          "B"
                      )}
                    </TableCell>
                    <TableCell>
                      {editStatus ? (
                        <TextField
                          defaultValue="C"
                          variant="outlined"
                        />
                      ) : (
                        "C"
                      )}
                    </TableCell>
                    <TableCell>
                      {editStatus ? (
                        <TextField
                          defaultValue="D"
                          variant="outlined"
                        />
                      ) : (
                        "D"
                      )}
                    </TableCell>
                    <TableCell>{data?.sample_person[index].nicknames}</TableCell>
                    <TableCell>
                      {editStatus ? (
                        <TextField
                          defaultValue={data?.sample_person[index].suffix}
                          variant="outlined"
                        />
                      ) : (
                        data?.sample_person[index].suffix
                      )}
                    </TableCell>
                    <TableCell>{data?.sample_person[index].google_id}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
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
                      <TableRow>
                        <TableCell>{data?.sample_person[index].app_id}</TableCell>
                        <TableCell>
                          {editStatus ? (
                            <TextField
                              defaultValue={data?.sample_person[index].person_id}
                              variant="outlined"
                            />
                          ) : (
                            data?.sample_person[index].person_id
                          )}
                        </TableCell>
                        <TableCell>
                          {data?.sample_person[index].typeByType?.typename}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
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
                      <TableRow>
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px',
                  }}
                >
                  <ColorLabel type={1} />
                  <ColorLabel type={2} />
                  <ColorLabel type={3} />
                  <ColorLabel type={4} />
                  <ColorLabel type={5} />
                </Box>
              </Box>
              {data?.sample_person[index].user_accounts.length > 0 ? (
                <Box
                  sx={{
                    p: 1,
                    m: 2,
                    border: '1px solid #000',
                    borderRadius: '5px',
                    flex: 1,
                  }}
                >
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <strong>{rowSubTitle.name}:</strong>
                          </TableCell>
                          <TableCell>
                            {
                              data?.sample_person[index].user_accounts[subIndex]
                                ?.account_name
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>{rowSubTitle.type}:</strong>
                          </TableCell>
                          <TableCell>
                            {
                              data?.sample_person[index].user_accounts[subIndex]
                                ?.accountTypeByAccountType?.account_type_name
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>{rowSubTitle.location}:</strong>
                          </TableCell>
                          <TableCell>
                            {
                              data?.sample_person[index].user_accounts[subIndex]
                                ?.account_location
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>{rowSubTitle.activeDate}:</strong>
                          </TableCell>
                          <TableCell>
                            {
                              data?.sample_person[index].user_accounts[subIndex]
                                ?.active_since
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>{rowSubTitle.pmStatus}:</strong>
                          </TableCell>
                          <TableCell>
                            {data?.sample_person[index].user_accounts[subIndex]
                              ?.is_pm
                              ? 'Yes'
                              : 'No'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>{rowSubTitle.canEmail}:</strong>
                          </TableCell>
                          <TableCell>
                            {data?.sample_person[index].user_accounts[subIndex]
                              ?.can_email
                              ? 'Yes'
                              : 'No'}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    sx={{
                      textAlign: 'center',
                      padding: '20px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleSubIndex()}
                  >
                    {subIndex + 1} of{' '}
                    {data?.sample_person[index].user_accounts?.length} &gt;
                  </Box>
                </Box>
              ) : (
                ''
              )}
            </Box>
          </>
        )}
        <Box sx={{ m: 2, textAlign: 'center' }}>
          {collapse ? (
            ''
          ) : (
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
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {index > 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  padding: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => handleIndex('prev')}
              >
                &lt; Previous
              </Box>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={6}>
            {index + 1 < data?.sample_person.length ? (
              <Box
                sx={{
                  textAlign: 'center',
                  padding: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => handleIndex('next')}
              >
                Next &gt;
              </Box>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountMain;
