import React, { MouseEventHandler, useEffect, useState } from "react";
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

interface tableWrapperProps {
  children: (props: {
    descendingComparator: any;
    getComparator: any;
    stableSort: any;
    EnhancedTableHead: React.FC<{
      order: Order;
      orderBy: any;
      onRequestSort: any;
      headCells: any;
    }>;
    tableElements: any;
    onDelete: (id: string | undefined) => void;
    onSave: Function;
    onCancel: Function;
    onSaveWithProvidedState: (state: any) => void;
  }) => React.ReactNode;
  buttonsList?: [
    { label: string; buttonFunction?: MouseEventHandler<HTMLButtonElement> }
  ];
  rows: any[];
  disableAddBtn?: boolean;
}

const Index: React.FC<tableWrapperProps> = ({
  children,
  buttonsList,
  rows,
  disableAddBtn,
}) => {
  const {
    tableElements,
    onDelete,
    onChangeAddState,
    onSave,
    onCancel,
    onSaveWithProvidedState,
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
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
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
    <div>
      <div
        style={{
          overflow: "auto",
          width: "100%",
          position: "relative",
        }}
      >
        <Box sx={{ position: "fixed", right: "0px", top: "10px" }}>
          {!disableAddBtn && (
            <Button
              sx={{ m: "auto 20px auto auto" }}
              color={"success"}
              variant={"contained"}
              onClick={onChangeAddState}
            >
              Add
            </Button>
          )}
          {buttonsListState.map((elem, index) => (
            <Button
              sx={{ m: "auto 20px auto auto" }}
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
              onSave,
              onCancel,
              onSaveWithProvidedState,
            })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Index;
