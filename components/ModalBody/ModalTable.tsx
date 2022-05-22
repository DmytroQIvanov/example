import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import {
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineRight,
} from 'react-icons/ai';

interface ItemType {
  id: number;
  personType: string;
  unitType: string;
  firstName: string;
  mt: string;
  lastName: string;
  nickName: string;
  location: string;
  lastOrganized: string;
  other: string;
}

const rows: ItemType[] = [
  {
    id: 1,
    personType: 'GR',
    unitType: 'BX',
    firstName: 'Alberto',
    mt: 'A',
    lastName: 'Agulia1',
    nickName: 'AI1',
    location: 'LA, BR',
    lastOrganized: '03/02/2021',
    other: 'Football1',
  },
  {
    id: 2,
    personType: 'GR',
    unitType: 'AD',
    firstName: 'Albe1',
    mt: 'B',
    lastName: 'Agulia2',
    nickName: 'AI2',
    location: 'LA, BR',
    lastOrganized: '03/02/2021',
    other: 'Football2',
  },
  {
    id: 3,
    personType: 'GR',
    unitType: 'BX',
    firstName: 'Albe2',
    mt: 'AB',
    lastName: 'Agulia3',
    nickName: 'AI3',
    location: 'LA, BR',
    lastOrganized: '03/02/2021',
    other: 'Football3',
  },
  {
    id: 4,
    personType: 'GR',
    unitType: 'AD',
    firstName: 'Albe3',
    mt: 'C',
    lastName: 'Agulia4',
    nickName: 'AI4',
    location: 'LA, BR',
    lastOrganized: '03/02/2021',
    other: 'Football4',
  },
  {
    id: 5,
    personType: '',
    unitType: 'BX',
    firstName: 'Albe4',
    mt: 'A',
    lastName: 'Agulia5',
    nickName: 'AI5',
    location: 'LA, BR',
    lastOrganized: '03/02/2021',
    other: 'Football5',
  },
  {
    id: 6,
    personType: '',
    unitType: 'BX',
    firstName: 'Albe5',
    mt: 'B',
    lastName: 'Agulia6',
    nickName: 'AI6',
    location: 'LA, BR',
    lastOrganized: '03/02/2021',
    other: 'Football6',
  },
  {
    id: 7,
    personType: '',
    unitType: 'BX',
    firstName: 'Albe6',
    mt: 'C',
    lastName: 'Agulia7',
    nickName: 'AI7',
    location: 'LA, BR',
    lastOrganized: '03/02/2021',
    other: 'Football7',
  },
].sort((a, b) => (a.id < b.id ? -1 : 1));

function ModalTable() {
  const [items, setItems] = useState<Array<ItemType>>([]);

  const addItem = (newItem: ItemType) => {
    const filteredItems = items.filter((item) => item.id !== newItem.id);
    filteredItems.push(newItem);
    setItems(filteredItems);
  };

  const removeItem = (newItem: ItemType) => {
    const filteredItems = items.filter((item) => item.id !== newItem.id);
    setItems(filteredItems);
  };

  return (
      <div className="mt-9 flex h-full w-full flex-col gap-5">
        <div>
          {items.map((item) => (
              <div
                  key={item.id}
                  className="m-1 inline-block rounded-full bg-blue-700 py-1 pl-4 pr-2 text-white"
              >
                <div className="flex h-full w-full flex-row items-center justify-center gap-1 hover:cursor-pointer">
                  <div className="mr-1">{item.firstName}</div>
                  <AiFillCloseCircle
                      onClick={() => removeItem(item)}
                      className="h-6 w-6 text-blue-100 hover:cursor-pointer"
                  />
                </div>
              </div>
          ))}
        </div>
        <TableContainer className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">PID</TableCell>
                <TableCell className="hidden sm:table-cell" align="center">
                  Type
                </TableCell>
                <TableCell className="hidden sm:table-cell" align="center">
                  Unit Type
                </TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell className="hidden md:table-cell" align="center">
                  Middle Initial
                </TableCell>
                <TableCell className="hidden md:table-cell" align="center">
                  Last Name
                </TableCell>
                <TableCell className="hidden md:table-cell" align="center">
                  Nick Name
                </TableCell>
                <TableCell className="hidden md:table-cell" align="center">
                  Campus
                </TableCell>
                <TableCell className="hidden md:table-cell" align="center">
                  Last Organized
                </TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                  <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell className="hidden sm:table-cell" align="center">
                      {row.personType}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell" align="center">
                      {row.unitType}
                    </TableCell>
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell className="hidden md:table-cell" align="center">
                      {row.mt}
                    </TableCell>
                    <TableCell className="hidden md:table-cell" align="center">
                      {row.lastName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell" align="center">
                      {row.nickName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell" align="center">
                      {row.location}
                    </TableCell>
                    <TableCell className="hidden md:table-cell" align="center">
                      {row.lastOrganized}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <div className="flex flex-row items-center justify-center gap-3">
                        {!items.filter((item) => item.id === row.id).length ? (
                            <AiOutlinePlus
                                onClick={() => addItem(row)}
                                className="font-bold text-green-600 hover:cursor-pointer hover:text-green-700"
                            />
                        ) : (
                            <AiOutlineClose
                                onClick={() => removeItem(row)}
                                className="font-bold text-red-600 hover:cursor-pointer hover:text-red-700"
                            />
                        )}
                        <AiOutlineRight className="text-blue-700 hover:cursor-pointer" />
                      </div>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

export default React.memo(ModalTable);
