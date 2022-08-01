import React, { useEffect, useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { Order } from "../TablesComponents/Interfaces/Order";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PERSON_ELECTRONIC,
  INSERT_PERSON_ELECTRONIC,
  PERSON_ELECTRONIC_DATA,
  UPDATE_PERSON_ELECTRONIC,
} from "../../../schemas/PersonElectronicSchema";

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "electronic_address",
    label: "Electronic Address",
  },
  {
    id: "electronic_type",
    label: "Electronic Type",
    sortingBy: "electronic_type.electronic_type_id",
  },
  {
    id: "information_source_type",
    label: "Source",
    sortingBy: "electronic_type.electronic_type_id",
  },
  {
    id: "emailOptions",
    label: "Email Options",
  },
  {
    id: "date_first_known_valid",
    label: "DFKV",
  },
  {
    id: "date_last_known_valid",
    label: "DLKV",
  },
  {
    id: "date_marked_invalid",
    label: "DMI",
  },
  {
    id: "options",
    label: "Options",
  },
];

const Index = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IRowsPersonEmploymentTable>("id");

  const handleRequestSort = (
    _: any,
    property: keyof IRowsPersonEmploymentTable
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [data, setData] = useState<any[]>([]);
  const [successAlert, setSuccessAlert] = useState(false);

  const router = useRouter();
  const {
    data: personElectronicTables,
    error,
    loading,
    fetchMore,
    refetch,
  } = useQuery(PERSON_ELECTRONIC_DATA, {
    variables: { pid: router.query.id },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (personElectronicTables?.person_electronic)
      setData(() =>
        personElectronicTables?.person_electronic.map((elem: any) => {
          return {
            id: elem.person_electronic_id,
            ...elem,
            validateState: Boolean(elem.date_marked_invalid),
          };
        })
      );
  }, [personElectronicTables?.person_electronic]);

  const [changeFunction, { loading: changeLoading }] = useMutation(
    UPDATE_PERSON_ELECTRONIC
  );

  const [createFunction, { loading: createLoading, error: createError }] =
    useMutation(INSERT_PERSON_ELECTRONIC);

  const [deleteFunction, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_PERSON_ELECTRONIC);

  const onChangeFunction = (state: any) => {
    const date = new Date();

    changeFunction({
      variables: {
        email: state.electronic_address,
        source: state.information_source_type.information_source_type_id,
        electronictype: state.electronic_type.electronic_type_id,

        id: state.person_electronic_id,
      },
    }).catch(setErrorMessage);
  };
  const onCreateFunction = (state: any) => {
    const date = new Date();

    createFunction({
      variables: {
        email: state.electronic_address,
        source: state.information_source_type.information_source_type_id,
        electronictype: state.electronic_type.electronic_type_id,
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
    if (!state.person_electronic_id) return;
    deleteFunction({ variables: { id: state.person_electronic_id } }).catch(
      setErrorMessage
    );
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <TableWrapper
      rows={data}
      refetch={refetch}
      onChangeFunction={onChangeFunction}
      onSaveFunction={onCreateFunction}
      deleteFunction={onDeleteFunction}
      errorMessage={errorMessage}
    >
      {({
        EnhancedTableHead,
        stableSort,
        getComparator,
        onSaveWithProvidedState,
        onChangeWithProvidedState,
        onAddSave,
        onAddCancel,
        activeRowObject,
        onDelete,
        tableElements: data,
      }) => (
        <>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {/*@ts-ignore*/}
            {stableSort(data, getComparator(order, orderBy)).map(
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
                />
              )
            )}
          </TableBody>
        </>
      )}
    </TableWrapper>
  );
};

export default React.memo(Index);
