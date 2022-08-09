import React from "react";
import TableWrapper from "../TablesComponents/TableWrapper/Index";

import { IColumnsPersonEmploymentTable } from "./interfaces";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";
import { useRouter } from "next/router";
import UseTableValues from "../../../hooks/UseTableValues";
import {
  BUILDING_DELETE,
  BUILDING_INSERT,
  BUILDING_QUERY,
  BUILDING_UPDATE,
} from "../../../schemas/BuildingTableSchema";
import { useUser } from "@clerk/nextjs";

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "room",
    label: "Room",
  },
  {
    id: "floor",
    label: "Floor",
  },
  {
    id: "locationType",
    label: "Location Type",
  },
  {
    id: "dateCreated",
    label: "Date Created",
  },
  {
    id: "locationId",
    label: "Location ID",
  },
  {
    id: "options",
    label: "Options",
  },
];

const BuildingTable = () => {
  const router = useRouter();
  const {
    tableElements,
    refetch,
    functions: { createFunction, deleteFunction, changeFunction },
    alert: { setSuccessAlert, successAlert },
    error: { setErrorMessage, errorMessage },
  } = UseTableValues({
    tableNames: {
      tableName: "location",
      idName: "location_id",
    },
    schemas: {
      changeSchema: BUILDING_UPDATE,
      createSchema: BUILDING_INSERT,
      deleteSchema: BUILDING_DELETE,
      querySchema: BUILDING_QUERY,
    },
    customVariables: { id: router.query.id },
  });

  const { user } = useUser();

  const onCreateFunction = (state: any) => {
    createFunction({
      id: router.query.id,
      floor: state.floor,
      type: state.location_type.location_type_id,
      room: state.room,
      created_by: `${user?.firstName} ${user?.lastName}`,
    });
  };

  const onChangeFunction = (state: any) => {
    changeFunction({
      id: state.location_id,
      floor: state.floor,
      type: state.location_type.location_type_id,
      room: state.room,
    });
  };

  const onDeleteFunction = (state: any) => {
    deleteFunction({ id: state.location_id });
  };
  return (
    <TableWrapper
      rows={tableElements}
      onSaveFunction={onCreateFunction}
      onChangeFunction={onChangeFunction}
      deleteFunction={onDeleteFunction}
      refetch={refetch}
      errorMessage={errorMessage}
      headCells={headCells}
      TableRowComponent={TableRowComponent}
    />
  );
};

export default React.memo(BuildingTable);
