import React, {useState} from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import {Box, Button} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

//ICONS
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ModalBody from "../PersonInteractionModal";



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


interface Data {
  id?:string
  category: string;
  interaction: string;
  response: string;
  informationSource: string;
  organizers: string;
  interactionDate: string;
  createdBy: string;
  dateCreated: string;
  options?: string;
}
const array: Data[] = [
  {
    id:'1',
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
    id:'2',

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
    id:'3',

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
    id:'4',

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

const rows = array;

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  overflow:'scroll',
  boxShadow: 24,
  p: 4,
};
interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeadCell[];
}
export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.label}
            className="whitespace-nowrap"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const PersonInteractionTable = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("category");

  const handleRequestSort = (_: any, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [deleteModal,setDeleteModal] = useState(false);

  const handleCloseDeleteModal =()=>{
    setDeleteModal(false);
  }

  const handleOpenDeleteModal =()=>{
    setDeleteModal(true);
  }
  const [personInteractionModal,setPersonInteractionModal] = useState(false);

  const handleClosePersonInteractionModal =()=>{
    setPersonInteractionModal(false);
  }

  const handleOpenPersonInteractionModal =()=>{
    setPersonInteractionModal(true);
  }
  return (
      <div>
    <TableContainer component={Paper} >
      <Table aria-label="simple table" >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
        />
        <TableBody>
           {/*@ts-ignore*/}
          {stableSort(rows, getComparator(order, orderBy)).map((row,index) => (
            <TableRow key={`${row.id}`}>
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell>{row.interaction}</TableCell>
              <TableCell>{row.response}</TableCell>
              <TableCell>{row.informationSource}</TableCell>
              <TableCell>{row.organizers}</TableCell>
              <TableCell>{row.interactionDate}</TableCell>
              <TableCell>{row.createdBy}</TableCell>
              <TableCell>{row.dateCreated}</TableCell>
              <TableCell>
                <AddSharpIcon onClick={handleOpenPersonInteractionModal} sx={{cursor:"pointer",mr:'2px'}}/>
                <EditSharpIcon onClick={handleOpenPersonInteractionModal} sx={{cursor:"pointer",mr:'2px'}}/>
                <DeleteIcon onClick={handleOpenDeleteModal} sx={{cursor:"pointer"}}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <Modal
            open={deleteModal}
            onClose={handleCloseDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm deletion?
            </Typography>
            <Box sx={{mt:3}}>
            <Button color={"success"} variant={"contained"} sx={{mr:3}}>Yes</Button>
            <Button color={'error'} variant={"contained"}>No</Button>
            </Box>
          </Box>
        </Modal>

        <Modal
            open={personInteractionModal}
            onClose={handleClosePersonInteractionModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ModalBody onClose={handleClosePersonInteractionModal}/>
          </Box>
        </Modal>


      </div>
  );
};

export default React.memo(PersonInteractionTable);
