import React, { useEffect, useState } from "react";
import TableBody from "@material-ui/core/TableBody";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import TableWrapper from "../TablesComponents/TableWrapper/Index";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PERSON_PHONE,
  INSERT_PERSON_PHONE,
  PERSON_PHONE_DATA,
  UPDATE_PERSON_PHONE,
} from "../../../schemas/PhonesSchemas";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
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

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "phoneNumber",
    numeric: true,
    label: "Phone Number",
    sortingBy: "phone_number",
  },
  {
    id: "phonyType",
    numeric: false,
    label: "Phone Type",
    sortingBy: "phone_type.phone_type_id",
  },
  {
    id: "infoSource",
    numeric: false,
    label: "Info Source",
    sortingBy: "information_source_type.information_source_type_id",
  },
  {
    id: "doNotCallDate",
    numeric: false,
    label: "Do Not Call Date",
    sortingBy: "date_marked_do_not_call",
  },
  {
    id: "comments",
    numeric: false,
    label: "Comments",
    width: "400px",
  },
  {
    id: "date_first_known_valid",
    numeric: false,
    label: "DFKV",
  },
  {
    id: "date_last_known_valid",
    numeric: false,
    label: "DLKV",
  },
  {
    id: "date_marked_invalid",
    numeric: false,
    label: "DMI",
  },
  {
    id: "options",
    numeric: false,
    label: "Options",
  },
];
const PhoneTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IRowsPersonEmploymentTable>("id");
  const [successAlert, setSuccessAlert] = useState(false);

  const handleRequestSort = (
    _: any,
    property: keyof IRowsPersonEmploymentTable
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [tableElements, setTableElements] = useState([]);

  const router = useRouter();
  const {
    data: personPhoneTables,
    error,
    loading,
    fetchMore,
    refetch,
  } = useQuery(PERSON_PHONE_DATA, {
    variables: { pid: router.query.id },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (personPhoneTables?.person_phone)
      setTableElements(() =>
        personPhoneTables?.person_phone.map((elem: any) => {
          return {
            id: elem.person_phone_id,
            ...elem,
            validateState: Boolean(elem.date_marked_invalid),
          };
        })
      );
  }, [personPhoneTables?.person_phone]);

  const [changeFunction, { loading: changeLoading }] =
    useMutation(UPDATE_PERSON_PHONE);

  const [createFunction, { loading: createLoading, error: createError }] =
    useMutation(INSERT_PERSON_PHONE);

  const [deleteFunction, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_PERSON_PHONE);

  const onChangeFunction = (state: any) => {
    changeFunction({
      variables: {
        number: state.phone_number,
        type: state.phone_type.phone_type_id,
        source: state.information_source_type.information_source_type_id,
        dnc: state.date_marked_do_not_call,
        comments: state.comments,

        id: state.person_phone_id,
      },
    })
      .then(() => {
        refetch();
      })
      .catch(setErrorMessage);
  };
  const onCreateFunction = (state: any) => {
    createFunction({
      variables: {
        number: state.phone_number,
        type: state.phone_type.phone_type_id,
        source: state.information_source_type.information_source_type_id,
        comments: state.comments,
        dnc: state.dncBoolean ? state.date_marked_do_not_call : null,

        pid: router.query.id,
      },
    })
      .then(() => {
        setSuccessAlert(true);

        refetch();
      })
      .catch(setErrorMessage);
  };

  const onDeleteFunction = (state: any) => {
    if (!state.person_phone_id) return;
    deleteFunction({
      variables: { id: state.person_phone_id },
    }).catch(setErrorMessage);
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  return (
    <TableWrapper
      rows={tableElements}
      onSaveFunction={onCreateFunction}
      onChangeFunction={onChangeFunction}
      deleteFunction={onDeleteFunction}
      refetch={refetch}
      errorMessage={errorMessage}
    >
      {({
        EnhancedTableHead,
        stableSort,
        getComparator,
        tableElements,
        onSaveWithProvidedState,
        onChangeWithProvidedState,
        onAddSave,
        onAddCancel,
        activeRowObject,
        onDelete,
      }) => (
        <>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            success={{ successAlert, setSuccessAlert }}
          />
          <TableBody>
            {/*@ts-ignore*/}
            {stableSort(tableElements, getComparator(order, orderBy)).map(
              (row: IRowsPersonEmploymentTable) => (
                <TableRowComponent
                  row={row}
                  key={`${row.id}`}
                  onChangeWithProvidedState={onChangeWithProvidedState}
                  onSaveWithProvidedState={onSaveWithProvidedState}
                  onDelete={onDelete}
                  onAddSave={onAddSave}
                  onAddCancel={onAddCancel}
                  activeRowObject={activeRowObject}
                  refetch={refetch}
                />
              )
            )}
          </TableBody>
        </>
      )}
    </TableWrapper>
  );
};

export default React.memo(PhoneTable);
