import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Collapse, LinearProgress } from "@mui/material";
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
import { ITableWrapperProps } from "../Interfaces/TableWrapperInterfaces";
import Modal from "@mui/material/Modal";
import { tableWrapperModalStyle } from "./style";
import TableBody from "@material-ui/core/TableBody";

const Index: React.FC<ITableWrapperProps> = ({
  buttonsList,
  rows,
  disableAddBtn,
  refetch,
  deleteFunction,
  onSaveFunction,
  onChangeFunction,
  errorMessage,
  headCells,
  TableRowComponent,
  addressEditModal,
}) => {
  const {
    tableElements,
    onChangeAddState,
    onAddSave,
    onAddCancel,
    onSaveWithProvidedState,
    activeRowObject,
    handleChangeMainStateEvent,
    handleChangeMainState,
    onChangeWithProvidedState,
    onDelete,
  } = useTableWrapper(
    rows,
    refetch,
    deleteFunction,
    onSaveFunction,
    onChangeFunction
  );
  const checkPermissionError = (text: string): boolean => {
    if (text.toString().includes("not found in type: 'mutation_root'"))
      return true;
    return false;
  };

  const [buttonsListState, setButtonsListState] = useState(
    buttonsList !== undefined ? buttonsList : []
  );

  const [errorMessageText, handleErrorMessage] = useState<string | null>();

  const [permissionError, setPermissionError] = useState(false);
  useEffect(() => {
    if (errorMessage) {
      refetch && refetch();
      setPermissionError(checkPermissionError(errorMessage));
    }
  }, [errorMessage]);
  useEffect(() => {
    if (errorMessageText) {
      refetch && refetch();
      setPermissionError(checkPermissionError(errorMessageText));
    }
  }, [errorMessageText]);

  //SORT FUNCTIONS
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const func = (obj: any) => {
      const result = orderBy.toString().split(".");
      if (result.length === 2) {
        return obj[result[0]]?.[result[1]];
      } else if (result.length === 3) {
        return obj[result[0]]?.[result[1]]?.[result[2]];
      } else {
        return obj[orderBy];
      }
    };
    if (func(b) < func(a)) {
      return -1;
    }
    if (func(b) > func(a)) {
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
    const { order, orderBy, onRequestSort, loading, error, success } = props;
    const createSortHandler =
      (property: any) => (event: React.MouseEvent<unknown>) => {
        if (property == "options") return;

        onRequestSort(event, property);
      };

    // const [errorMessage, setErrorMessage] = useState(false);
    // useEffect(() => {
    //   if (error) setErrorMessage(true);
    // }, [error]);
    //
    // useEffect(() => {
    //   if (errorMessage) {
    //     setTimeout(() => {
    //       setAlertSuccessPopup(false);
    //     }, 4000);
    //   }
    // }, [errorMessage]);

    // const [successMessage, setSuccessMessage] = useState(false);
    // useEffect(() => {
    //   if (success.successMessage) setSuccessMessage(true);
    // }, [success.successMessage]);

    useEffect(() => {
      if (success?.successAlert) {
        setTimeout(() => {
          success.setSuccessAlert && success.setSuccessAlert(false);
        }, 4000);
      }
    }, [success?.successAlert]);

    return (
      <TableHead>
        <Box
          sx={{
            position: "fixed",
            right: "20px",
            top: "85px",
            zIndex: "1000",
          }}
        >
          {/*<Collapse in={error.errorAlert}>*/}
          {/*  <Alert onClose={() => setErrorMessage(false)}>Something</Alert>*/}
          {/*</Collapse>*/}
          <Collapse in={success?.successAlert || false}>
            <Alert onClose={() => success?.setSuccessAlert(false)}>
              The row was created successfully!
            </Alert>
          </Collapse>
        </Box>
        <TableRow>
          {props.headCells.map((headCell: any) => {
            let sortingBy = headCell?.sortingBy || headCell.id;

            return (
              <TableCell
                key={headCell.label}
                className="whitespace-nowrap"
                sortDirection={orderBy === headCell.id ? order : false}
                width={headCell.width && headCell.width}
              >
                {headCell.id !== "options" ? (
                  <TableSortLabel
                    active={orderBy === sortingBy}
                    direction={orderBy === sortingBy ? order : "asc"}
                    onClick={createSortHandler(sortingBy)}
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
                ) : (
                  <Box sx={{ cursor: "default" }}>
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
                  </Box>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        {loading && (
          <LinearProgress sx={{ width: "100%", position: "absolute" }} />
        )}
      </TableHead>
    );
  }

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setPermissionError(false);
  };

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("id");
  const handleRequestSort = (_: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
              disabled={elem?.disabled}
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
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
              // success={{ successAlert, setSuccessAlert }}
            />
            <>
              <TableBody>
                {/*@ts-ignore*/}
                {stableSort(tableElements, getComparator(order, orderBy)).map(
                  (row: any) => (
                    <TableRowComponent
                      row={row}
                      key={`${row.id}`}
                      refetch={refetch}
                      tableElements={tableElements}
                      onAddSave={onAddSave}
                      handleChangeMainStateEvent={handleChangeMainStateEvent}
                      handleChangeMainState={handleChangeMainState}
                      onAddCancel={onAddCancel}
                      onSaveWithProvidedState={onSaveWithProvidedState}
                      onChangeWithProvidedState={onChangeWithProvidedState}
                      activeRowObject={activeRowObject}
                      onDelete={onDelete}
                      handleErrorMessage={handleErrorMessage}
                    />
                  )
                )}
              </TableBody>
              <Modal
                open={permissionError}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...tableWrapperModalStyle, width: "40vw" }}>
                  <h2>
                    You currently do not have permissions to perform that action
                  </h2>

                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="error"
                    sx={{
                      mt: "20px",
                      display: "block",
                      mr: "0px",
                      ml: "auto",
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </Modal>
              {addressEditModal &&
                addressEditModal({ onSaveWithProvidedState })}
            </>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Index;
