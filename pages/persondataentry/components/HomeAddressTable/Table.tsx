import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';

import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import {
  Button
} from '@mui/material';

import Header from '../../../../components/Table/Header';
import Row from './Row';
import { Order, RowData, HeaderCellData } from '../../../../components/Table/Type';
import AddressEditModal from '../../../../components/Table/RowCells/AddressEditModal';
import TableData, { HeaderData } from './Type';
import useStyles from '../../../styles';

const generateItems = (amount: number) => {
  return TableData.slice(0, amount);
};

export default function EnhancedTable({headerData, tableData}: {headerData: HeaderCellData[], tableData: any[]}) {
  const tableEl = useRef();
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [hasMore] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [filter, setFilter] = useState(null);
  const [filterBy, setFilterBy] = useState(null);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const address = {address: {}}

  useEffect(() => {
    if (!tableData) {
      setRows(generateItems(10));
    } else {
      setRows(dataWrapper(tableData))
    }
    if (!headerData) {
      setHeaders(HeaderData);
    }
  }, [tableData, ]);

  const loadMore = useCallback(() => {
    const loadItems = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          const amount = rows.length + 10;
          // setRows(generateItems(amount));
          setLoading(false);
          resolve();
        }, 500);
      });
    };
    setLoading(true);
    loadItems();
  }, [rows]);

  const scrollListener = useCallback(() => {
    const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
    if (!distanceBottom) {
      setDistanceBottom(Math.round((bottom / 100) * 20));
    }
    if (
      tableEl.current.scrollTop > bottom - distanceBottom &&
      hasMore &&
      !loading
    ) {
      loadMore();
    }
  }, [hasMore, loadMore, loading, distanceBottom]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef.addEventListener('scroll', scrollListener);
    return () => {
      tableRef.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);

  const handleOnClickSort = (_order: Order, _orderBy: string) => {
    setOrder(_order);
    setOrderBy(_orderBy);
    let newRows = rows.sort((a, b) => {
      if (a[_orderBy].value1 && b[_orderBy].value1) {
        if (_order == 0) {
          if(a[_orderBy].value1 < b[_orderBy].value1) { return -1; }
          if(a[_orderBy].value1 > b[_orderBy].value1) { return 1; }
        } else {
          if(a[_orderBy].value1 > b[_orderBy].value1) { return -1; }
          if(a[_orderBy].value1 < b[_orderBy].value1) { return 1; }
        }
      }
      return 0;
    })
    setRows(newRows);
  };

  const handleOnClickFilter = (_filter: string, _filterBy: string) => {
    setFilter(_filter);
    setFilterBy(_filterBy);
    console.log(
      '----------handle on click filter-----------',
      filter,
      filterBy
    );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const onChangeAddress = (address: any) => {
    let data = [...rows];
    let newItem = {
      'id': (Math.random() + 1).toString(36).substring(7),
      'home-address': { value1: address.full },
      'location-accuracy': { value1: '' },
      'source': { value1: address.source },
      'comments': { value1: address.comments },
      'dfku': { value1: '01/01/2021' },
      'dlkv': { value1: '01/01/2021' },
      'marked-invalid': { value1: '01/05/2021', ctaChecked: false },
      'options': { address: address },
    }
    data.push(newItem)
    setRows(data);
  }

  const dataWrapper = (addresses: any) => {
    let res : RowData[] = []

    res = addresses.map((address : RowData) => {
      let tempAddress = {
        id: address.id,
        city: address.city,
        comments: "",
        country: address.country ? address.country : '',
        // full: "CHC Nawabganj-Bija Mau Road, Bija Mau, Uttar Pradesh, India, 262406"
        postal: address.zip,
        source: "",
        state: address.state,
        street: address.streetname,
        street_number: address.streetnumber,
        full: ''
      }
      tempAddress.full = [tempAddress['street'], tempAddress['city'], tempAddress['state'], tempAddress['postal'], tempAddress['country']].join(', ')
      return {
        'home-address': {
          value1: tempAddress.full
        },
        'location-accuracy': {
          value1: address.location_accuracy
        },
        'source': { value1: '' },
        'comments': { value1: address.comments },
        'dfku': { value1: address.datefirstknownvalid },
        'dlkv': { value1: address.datelastknownvalid },
        'marked-invalid': { value1: '', ctaChecked: false },
        'options': { address: tempAddress,
          datemarkedinvalid: address.datemarkedinvalid ? true : false },
      }
    })

    return res;
  }

  const onRowDelete = (id: string) => {
    let newRows = rows.filter(row => row.id != id);
    setRows(newRows);
  }

  const onUpdateData = (id: string, data: any) => {
    let newRows = rows.map(row => {
      if (row.id == id) {
        return data;
      }
      return row;
    });
    setRows(newRows);
  }

  return (
    <>
      <Grid className={classes.actions}>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          Add
        </Button>
      </Grid>
      <TableContainer style={{ maxHeight: 'calc(100vh - 350px)' }} ref={tableEl}>
        {loading && <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />}
        <Table stickyHeader
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
         >
          <Header
            numSelected={selected.length}
            data={headers}
            order={order}
            orderBy={orderBy}
            filter={filter}
            filterBy={filterBy}
            onClickSort={handleOnClickSort}
            onClickFilter={handleOnClickFilter}
          />
          <TableBody>
            {rows.map((rowData, rowIndex) => {
              return <Row key={rowData.id} data={rowData}
                rowDelete={()=>onRowDelete(rowData.id)}
                updateData={(data)=>onUpdateData(rowData.id, data)} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <AddressEditModal
          open={open}
          data={address}
          title={`Address Record`}
          handleClose={() => setOpen(false)}
          onChangeAddress={(address: any) => onChangeAddress(address)}
        />
      </div>
    </>
  );
}
