import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Grid,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";

import useAnchorState from "./Hooks/useAnchorState";
import SieveMenu from "./SieveMenu";
import { HeaderCellData, Order } from "./Type";

interface HeaderProps {
  numSelected: number;
  data: Array<HeaderCellData>;
  order: Order;
  orderBy: string;
  filter: string | null;
  filterBy: string | null;
  onClickSort: (order: Order, orderBy: string) => void;
  onClickFilter: (filter: string, filterBy: string) => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { data, onClickSort, onClickFilter } = props;
  const [selectedKey, setSelectedKey] = React.useState<string>("id");
  const {
    anchorEl,
    toggle: toggleSieveMenu,
    handleClose: handleOnSieveMenuClose,
  } = useAnchorState();

  const handleOnClickSieve =
    (key: string) => (event: React.MouseEvent<HTMLElement>) => {
      setSelectedKey(key);
      toggleSieveMenu(event);
    };

  const handleOnClickSort = (order: Order) => {
    onClickSort(order, selectedKey);
    handleOnSieveMenuClose();
  };

  const handleOnClickFilter = (filter: string) => {
    onClickFilter(filter, selectedKey);
    handleOnSieveMenuClose();
  };
  return (
    <TableHead>
      <TableRow>
        {data.map((headerCell) => (
          <TableCell key={headerCell.id} align="center">
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              wrap="nowrap"
            >
              <Grid item whiteSpace="nowrap">
                {headerCell.label}
              </Grid>
              <Grid item>
                <IconButton onClick={handleOnClickSieve(headerCell.id)}>
                  <FilterListIcon sx={{ fontSize: "12px" }} />
                </IconButton>
              </Grid>
            </Grid>
          </TableCell>
        ))}
        <SieveMenu
          anchorEl={anchorEl}
          itemName="test"
          open={Boolean(anchorEl)}
          order={props.order}
          orderBy={props.orderBy}
          filter={props.filter}
          filterBy={props.filterBy}
          key={selectedKey}
          onClose={handleOnSieveMenuClose}
          onClickSort={handleOnClickSort}
          onClickFilter={handleOnClickFilter}
        />
      </TableRow>
    </TableHead>
  );
};

export default Header;
