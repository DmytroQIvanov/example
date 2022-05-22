import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { BootstrapInput } from './Type';
import useStyles from './styles';

interface DataTypes {
  person_order_id: Number;
  first_name?: String;
  middle_name?: String;
  last_name?: String;
  nickname?: String;
  order_id?: Number;
  order_state?: String;
  code?: String;
}

const SEARCH_DATA = gql`
  query sample_search_bar_query {
    sample_person_order {
      person_order_id
      first_name
      middle_name
      last_name
      nickname
      order_id
      order_state
      code
    }
  }
`;

const searchTitle = {
  name: 'Name',
  id: 'ID',
  orderID: 'Order ID',
  code: 'Code',
  state: 'State',
};

const SearchMenu = () => {
  const [searchData, setSearchData] = React.useState('');

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchData(event.target.value.toLowerCase().trim());
  };

  const { data } = useQuery(SEARCH_DATA);
  const classes = useStyles();

  return (
    <>
      <BootstrapInput
        className="input-white"
        placeholder="Search Person"
        type="search"
        variant="standard"
        onChange={(event) => handleSearch(event)}
      />
      {searchData ? (
        <TableContainer className={classes.searchContainer}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box className={classes.result}>
                    <TableContainer className={classes.resultContainer}>
                      <Table sx={{pt: '-22px'}}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <strong>{searchTitle.name}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.id}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.orderID}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.code}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{searchTitle.state}</strong>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data?.sample_person_order.map(
                            ({
                              person_order_id,
                              first_name,
                              middle_name,
                              last_name,
                              nickname,
                              order_id,
                              order_state,
                              code,
                            }: DataTypes) => {
                              if (
                                `${last_name} ${first_name} ${middle_name} ${nickname}`
                                  .toLowerCase()
                                  .includes(searchData)
                              ) {
                                return (
                                  <TableRow key={person_order_id}>
                                    {' '}
                                    <TableCell>
                                      {' '}
                                      {`${last_name || ''}, ${
                                        first_name || ''
                                      } ${middle_name || ''} ${
                                        nickname || ''
                                      }`}{' '}
                                    </TableCell>{' '}
                                    <TableCell>{person_order_id}</TableCell>{' '}
                                    <TableCell>{order_id || ''}</TableCell>{' '}
                                    <TableCell>{code || ''}</TableCell>{' '}
                                    <TableCell>{order_state || ''}</TableCell>{' '}
                                  </TableRow>
                                );
                              }
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ''
      )}
    </>
  );
};

export default SearchMenu;
