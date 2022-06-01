import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Menu, MenuItem } from "@mui/material";
import { NestedMenuItem } from "mui-nested-menu/components";
import * as React from "react";

import { Order } from "../Type";
import useStyles from "./styles";

interface SieveMenuProps {
  anchorEl: any;
  itemName: string;
  open: boolean;
  order: Order;
  orderBy: string;
  filter?: string | undefined | null;
  filterBy?: string | undefined | null;
  onClose: () => void;
  onClickSort: (order: Order) => void;
  onClickFilter: (filter: string) => void;
}

const SieveMenu: React.FC<SieveMenuProps> = (props: SieveMenuProps) => {
  const { onClickSort, onClickFilter } = props;
  const classes = useStyles();

  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.open}
      onClose={props.onClose}
    >
      <MenuItem
        className={classes.menuItem}
        onClick={() => onClickSort(Order.asc)}
      >
        Sort A <ArrowForwardIcon className={classes.icon} /> Z
      </MenuItem>
      <MenuItem
        className={classes.menuItem}
        onClick={() => onClickSort(Order.desc)}
      >
        Sort Z <ArrowForwardIcon className={classes.icon} /> A
      </MenuItem>
      <NestedMenuItem
        className={classes.filterMenuItem}
        label="Filter"
        parentMenuOpen={props.open}
        rightIcon={<ArrowForwardIcon className={classes.icon} />}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={() => onClickFilter("filter1")}
        >
          filter 1
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => onClickFilter("filter2")}
        >
          filter 2
        </MenuItem>
      </NestedMenuItem>
    </Menu>
  );
};

export default SieveMenu;
