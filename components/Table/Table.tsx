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

import Header from './Header';
import Row from './Row';
import TableData, { HeaderData, Order, RowData, HeaderCellData } from './Type';
import useStyles from '../../pages/styles';

const generateItems = (amount: number) => {
  return TableData.slice(0, amount);
};

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >

        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

interface TableProps {
  headerData?: HeaderCellData[];
  tableData?: RowData[];
  saveRow?: any;
  deleteRow?: any;
  addRow?: any;
}

export default function EnhancedTable(props: TableProps) {
  const tableEl = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<RowData[]>([]);
  const [headers, setHeaders] = useState<HeaderCellData[]>([]);
  const [loading, setLoading] = useState(false);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [hasMore] = useState(true);
  const [order, setOrder] = useState<Order>(Order.asc);
  const [orderBy, setOrderBy] = useState('');
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (props.tableData) {
      setRows(props.tableData);
    } else {
      setRows(generateItems(10));
    }

    let headerData = props.headerData;
    console.log([headerData, headerData?.length])
    if (headerData && headerData.length > 0) {
      setHeaders(headerData)
    } else {
      setHeaders(HeaderData);
    }
  }, [props.tableData]);

  const loadMore = useCallback(() => {
    const loadItems = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          // const amount = rows.length + 10;
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
    console.log('ppppppppp')
    if (tableEl && tableEl.current) {
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
    }
  }, [hasMore, loadMore, loading, distanceBottom]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;

    if (tableRef) {
      tableRef.addEventListener('scroll', scrollListener);
      return () => {
        tableRef.removeEventListener('scroll', scrollListener);
      };
    }
  }, [scrollListener]);

  const handleOnClickSort = (_order: Order, _orderBy: string) => {
    setOrder(_order);
    setOrderBy(_orderBy);
    let newRows = rows.map(row => row).sort((a, b) => {
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
      setSelected([]);
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

  return (
    <>
      <Grid className={classes.actions}>
        <Button variant="contained" color="success" onClick={props.addRow}>
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
            {rows.map((rowData : any, rowIndex : number) => {
              return <Row id={rowData.id} data={rowData} headers={headers}
                saveRow={(data: any) => props.saveRow(data)}
                deleteRow={(data: any) => props.deleteRow(data)} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
