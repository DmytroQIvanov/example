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
import { DELETE_CAMPUS_TABLE } from "../../../shemas/CampusShemas";
import {
  DELETE_PERSON_RESEARCH,
  INSERT_PERSON_RESEARCH,
  MUTATE_PERSON_RESEARCH,
  PERSON_RESEARCH_QUERY,
} from "../../../shemas/PersonResearch";

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

// const rows: IRowsPersonEmploymentTable[] = [
//   {
//     id: "1",
//     date: "01/01/2021",
//     createdBy: "John Doe",
//     comments:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   {
//     id: "2",
//     date: "03/04/2022",
//     createdBy: "Olena",
//     comments:
//       "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
// ];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "date_researched",
    label: "Date",
  },
  {
    id: "comments",
    numeric: false,
    label: "Comments",
    width: "400px",
  },
  {
    id: "created_by",
    label: "Created By",
  },
  {
    id: "options",
    label: "Options",
  },
];

const PersonResearchTable = () => {
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
  // const [tableElements, setTableElements] = useState(rows);
  // const onDelete = (id: string | undefined) => {
  //   if (!id) return;
  //   setTableElements(tableElements.filter((elem) => elem.id !== id));
  // };

  const [data, setData] = useState<any[]>([]);

  const router = useRouter();
  const {
    data: personResearchTables,
    error,
    loading,
    fetchMore,
    refetch,
  } = useQuery(PERSON_RESEARCH_QUERY, {
    variables: { pid: router.query.id },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (personResearchTables?.person_research)
      setData(() =>
        personResearchTables?.person_research.map((elem: any) => {
          return {
            id: elem.person_research_id,
            ...elem,
          };
        })
      );
  }, [personResearchTables?.person_research]);

  const [changeFunction, { loading: changeLoading }] = useMutation(
    MUTATE_PERSON_RESEARCH
  );

  const [createFunction, { loading: createLoading, error: createError }] =
    useMutation(INSERT_PERSON_RESEARCH);

  const [deleteFunction, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_PERSON_RESEARCH);

  const onChangeFunction = (state: any) => {
    alert(state.person_research_id);
    changeFunction({
      variables: {
        id: state.person_research_id,
        date: state.date_researched,
        comments: state.comments || null,
      },
    });
  };
  const onCreateFunction = (state: any) => {
    createFunction({
      variables: {
        pid: router.query.id,
        date: state.date_researched,
        created_by: state.created_by,
        comments: state.comments || null,
      },
    });
  };

  const onDeleteFunction = (state: any) => {
    if (!state.person_research_id) return;
    deleteFunction({ variables: { id: state.person_research_id } });
  };

  return (
    <TableWrapper
      rows={data}
      onSaveFunction={onCreateFunction}
      onChangeFunction={onChangeFunction}
      deleteFunction={onDeleteFunction}
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
            loading={changeLoading || createLoading || deleteLoading}
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
                />
              )
            )}
          </TableBody>
        </>
      )}
    </TableWrapper>
  );
};

export default React.memo(PersonResearchTable);
