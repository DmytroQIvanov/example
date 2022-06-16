import React, { useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import { Box } from "@mui/material";
import ModalBody from "./PersonInteractionModal";

//ICONS
import Modal from "@mui/material/Modal";
import {
  IColumnsPersonEmploymentTable,
  IRowsPersonEmploymentTable,
} from "./interfaces";
import TableWrapper from "../TablesComponents/TableWrapper";
import TableRowComponent from "./TableRow";
import { HeadCell } from "../TablesComponents/Interfaces/HeadCell";

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

const rows: IRowsPersonEmploymentTable[] = [
  {
    id: "1",
    category: "O",
    interaction: "Orientation",
    response: "Yes",
    informationSource: "Debrief Sheet",
    organizers: "Nathan",
    interactionDate: "01/01/2021",
    createdBy: "John Doe",
    dateCreated: "01/05/2021",
  },
  {
    id: "2",

    category: "M",
    interaction: "Card",
    response: "Yes",
    informationSource: "Paper Card",
    organizers: "",
    interactionDate: "01/01/2021",
    createdBy: "John Doe",
    dateCreated: "01/05/2021",
  },
  {
    id: "3",

    category: "O",
    interaction: "Orientation",
    response: "Organized",
    informationSource: "Debrief",
    organizers: "",
    interactionDate: "09/01/2021",
    createdBy: "System",
    dateCreated: "09/05/2021",
  },
  {
    id: "4",

    category: "RA",
    interaction: "Card",
    response: "Reported",
    informationSource: "Debrief",
    organizers: "Jane Doe",
    interactionDate: "09/01/2021",
    createdBy: "System",
    dateCreated: "09/07/2021",
  },
];

const headCells: readonly HeadCell<IColumnsPersonEmploymentTable>[] = [
  {
    id: "category",
    numeric: true,
    label: "Category",
  },
  {
    id: "interaction",
    numeric: false,
    label: "Interaction",
  },
  {
    id: "response",
    numeric: false,
    label: "Response",
  },
  {
    id: "informationSource",
    numeric: false,
    label: "Information Source",
  },
  {
    id: "organizers",
    numeric: false,
    label: "Organizers",
  },
  {
    id: "interactionDate",
    numeric: false,
    label: "Interaction Date",
  },
  {
    id: "createdBy",
    numeric: false,
    label: "Created by",
  },
  {
    id: "dateCreated",
    numeric: false,
    label: "Date created",
  },
  {
    id: "options",
    numeric: false,
    label: "Options",
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Index = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IRowsPersonEmploymentTable>("options");

  const handleRequestSort = (
    _: any,
    property: keyof IRowsPersonEmploymentTable
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [tableElements, setTableElements] = useState(rows);
  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
  };

  const [personInteractionModal, setPersonInteractionModal] = useState(false);

  const handleClosePersonInteractionModal = () => {
    setPersonInteractionModal(false);
  };

  const handleOpenPersonInteractionModal = () => {
    setPersonInteractionModal(true);
  };
  return (
    <>
      <TableWrapper
        rows={rows}
        disableAddBtn
        buttonsList={[
          { label: "Add", buttonFunction: handleOpenPersonInteractionModal },
        ]}
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
            />
            <TableBody>
              {/*@ts-ignore*/}
              {stableSort(tableElements, getComparator(order, orderBy)).map(
                (row: IRowsPersonEmploymentTable) => (
                  <TableRowComponent
                    handleOpenPersonInteractionModal={
                      handleOpenPersonInteractionModal
                    }
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
      <Modal
        open={personInteractionModal}
        onClose={handleClosePersonInteractionModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, overflow: "scroll" }}>
          <ModalBody onClose={handleClosePersonInteractionModal} />
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(Index);
