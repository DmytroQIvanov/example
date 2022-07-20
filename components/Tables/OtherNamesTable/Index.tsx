import React, { useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import {
  IRowsPersonEmploymentTable,
  IColumnsPersonEmploymentTable,
} from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { Order } from "../TablesComponents/Interfaces/Order";
import { useMutation } from "@apollo/client";
import { UPDATE_HOME_ADDRESS } from "../../../shemas/HomeAddressShemas";
import {
  CHANGE_OTHER_NAME,
  CREATE_OTHER_NAME,
  DELETE_OTHER_NAMES,
  VALIDATE_OTHER_NAME,
} from "../../../shemas/OtherNamesShemas";
import { dateOptions } from "../TablesComponents/EditableBlock";

// const rows: IRowsPersonEmploymentTable[] = [
//   {
//     id: "1",
//     nameSourceType: "Departament Directory",
//     nameSourceSubType: "W298167",
//     firstName: "Christopfer",
//     middleNames: "Kennetch",
//     lastName: "Sugasree",
//     nickName: "May",
//     suffix: "smth",
//     dfkv: "01/01/2021",
//     dlkv: "01/01/2022",
//     dmi: "01/01/2022",
//   },
//   {
//     id: "2",
//     nameSourceType: "sDepartament Directory",
//     nameSourceSubType: "4W298167",
//     firstName: "Christop5425fer",
//     middleNames: "Kennetch47",
//     lastName: "Sugasreedad",
//     nickName: "ssss",
//     suffix: "smth555",
//     dfkv: "01/01/2041",
//     dlkv: "01/01/2012",
//     dmi: "01/01/2022",
//   },
// ];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "nameSource",
    label: "Name Source",
    sortingBy: "nameSourceType",
  },
  {
    id: "first_name",
    label: "First Name",
  },
  {
    id: "middle_name",
    label: "Middle Names",
  },
  {
    id: "last_name",
    label: "Last Name",
  },
  {
    id: "nick_name",
    label: "Nick Name",
    secondLabel: "Suffix",
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

const Index: React.FC<{
  tableData: IRowsPersonEmploymentTable[];
  loading?: boolean;
  refetch?: Function;
}> = ({ tableData, loading, refetch }) => {
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

  const [createFunction, { loading: createLoading, error }] =
    useMutation(CREATE_OTHER_NAME);
  const [changeFunction, { loading: changeLoading }] =
    useMutation(CHANGE_OTHER_NAME);
  console.log(error);

  const onChangeFunction = (state: any) => {
    const date = new Date();
    changeFunction({
      variables: {
        id: state.person_other_name_id,
        date: date,
        namesource: state.name_source_type.name_source_type_id,
        namesourcesubtype: state.name_source_subtype.name_source_type_id,
        first_name: state.first_name,
        middle_name: state.middle_name,
        last_name: state.last_name,
        nick_name: state.nick_name,
        suffix: state.suffix,
      },
    });
  };

  const [validateFunction, { loading: validateLoading }] =
    useMutation(VALIDATE_OTHER_NAME);

  const [deleteFunction, { loading: deleteLoading }] =
    useMutation(DELETE_OTHER_NAMES);

  const onDelete = (state: any) => {
    deleteFunction({ variables: { id: state.person_other_name_id } });
  };
  return (
    <TableWrapper
      rows={tableData}
      refetch={refetch}
      onSaveFunction={createFunction}
      onChangeFunction={onChangeFunction}
      deleteFunction={onDelete}

      // disableAddBtn
      // buttonsList={[{ label: "Add", buttonFunction: () => {} }]}
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
            loading={loading}
          />
          <TableBody style={{ minHeight: "200px", height: "200px" }}>
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
                  validateFunction={validateFunction}
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
