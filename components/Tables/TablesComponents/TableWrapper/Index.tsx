import React, { MouseEventHandler, useState } from "react";
import { Box, Button } from "@mui/material";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { Order } from "../Interfaces/Order";
import { useTableWrapper } from "../../../../hooks/UseTableWrapper";
import {
  IActiveRowObject,
  ITableWrapperProps,
} from "../Interfaces/TableWrapperInterfaces";

const Index: React.FC<ITableWrapperProps> = ({
  children,
  buttonsList,
  rows,
  disableAddBtn,
}) => {
  const {
    tableElements,
    onDelete,
    onChangeAddState,
    onAddSave,
    onAddCancel,
    onSaveWithProvidedState,
    activeRowObject,
    handleChangeMainStateEvent,
    handleChangeMainState,
    onChangeWithProvidedState,
  } = useTableWrapper(rows);
  const [buttonsListState, setButtonsListState] = useState(
    buttonsList !== undefined ? buttonsList : []
  );

  //SORT FUNCTIONS
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  //TABLE HEAD
  function EnhancedTableHead(props: any) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
      (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {props.headCells.map((headCell: any) => (
            <TableCell
              key={headCell.label}
              className="whitespace-nowrap"
              sortDirection={orderBy === headCell.id ? order : false}
              width={headCell.width && headCell.width}
            >
              <TableSortLabel
                active={orderBy === (headCell?.sortingBy || headCell.id)}
                direction={
                  orderBy === (headCell?.sortingBy || headCell.id)
                    ? order
                    : "asc"
                }
                onClick={createSortHandler(headCell?.sortingBy || headCell.id)}
              >
                <Box>
                  {headCell.label}
                  {headCell.secondLabel && (
                    <>
                      <br /> {headCell.secondLabel}
                    </>
                  )}
                </Box>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <div style={{ overflow: "auto" }}>
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            top: "10px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            width: "max-content",
            height: "min-content",
          }}
        >
          {!disableAddBtn && (
            <Button
              sx={{ m: "auto auto auto 20px" }}
              color={"success"}
              variant={"contained"}
              onClick={onChangeAddState}
            >
              Add
            </Button>
          )}
          {buttonsListState.map((elem, index) => (
            <Button
              sx={{ m: "auto auto auto 20px" }}
              color={"success"}
              variant={"contained"}
              onClick={
                elem.buttonFunction ? elem.buttonFunction : onChangeAddState
              }
              key={index}
            >
              {elem.label}
            </Button>
          ))}
        </Box>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "60px",
            minWidth: "100%",
            width: "max-content",
            position: "relative",
          }}
        >
          <Table aria-label="customized table">
            {children({
              EnhancedTableHead,
              stableSort,
              getComparator,
              descendingComparator,
              tableElements,
              onDelete,
              onAddSave,
              handleChangeMainStateEvent,
              handleChangeMainState,
              onAddCancel,
              onSaveWithProvidedState,
              onChangeWithProvidedState,
              activeRowObject,
            })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Index;
