import { HeaderCellData, RowData } from '../../../components/Table/Type';

export const HeaderData: HeaderCellData[] = [
  {
    id: 'dateresearched',
    label: 'Date',
    type: 1,
    options: {},
    variant: 1
  },
  {
    id: 'comments',
    label: 'Comments',
    type: 1,
    options: {},
    variant: 1,
  },
  {
    id: 'createdby',
    label: 'Created By',
    type: 1,
    options: {},
    variant: 1
  },
  {
    id: 'options',
    label: 'Options',
    type: 6,
    options: {},
    ctaLabel: '',
  },
];

const generateTableData = () => {
  const rowData = {
    'id': '53454',
    'dateresearched': { value1: '01/01/2021' },
    'comments': { value1: 'JD: Added departement, cohort' },
    'createdby': { value1: 'John Doe' },
    'options': {}
  };
  return Array(2).fill(rowData);
};

const TableData: readonly RowData[] = generateTableData();

export default TableData;