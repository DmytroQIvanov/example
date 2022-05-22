import { HeaderCellData,  } from "../../../components/Table/Type"

export const HeaderData: readonly HeaderCellData[] = [
  {
    id: 'home-address',
    label: 'Home Address',
    type: 1,
    options: {},
  },
  {
    id: 'locaiton-accuracy',
    label: 'Locaiton Accuracy',
    type: 1,
    options: {
      value1: ['ROOFTOP', 'RANGE INTERPOLATED'],
    },
  },
  {
    id: 'source',
    label: 'Source',
    type: 1,
    options: {
      value1: ['On the Ground', 'UC List  '],
    },
  },
  {
    id: 'id1-2',
    label: 'ID 1-2',
    type: 1,
    options: {
      value1: ['aaa', 'bbb', 'ccc'],
    },
    variant: 1,
  },
  {
    id: 'id1-3',
    label: 'ID 1-3-',
    type: 1,
    options: {
      value1: ['aaa', 'bbb', 'ccc'],
    },
    variant: 1,
    editDisabledValues: ['value1'],
  },

  {
    id: 'id2-1',
    label: 'ID 2-1',
    type: 2,
    options: {},
  },
  {
    id: 'id2-2',
    label: 'ID 2-2',
    type: 2,
    options: {
      value2: ['v2aaa', 'v2bbb', 'v2ccc'],
    },
    variant: 1,
  },
  {
    id: 'id2-3',
    label: 'ID 2-3',
    type: 2,
    options: {
      value1: ['v1aaa', 'v1bbb', 'v1ccc'],
    },
    variant: 2,
  },
  {
    id: 'id2-4',
    label: 'ID 2-4',
    type: 2,
    options: {
      value1: ['v1aaa', 'v1bbb', 'v1ccc'],
      value2: ['v2aaa', 'v2bbb', 'v2ccc'],
    },
    variant: 3,
    editDisabledValues: ['value1', 'value2'],
  },
  {
    id: 'id2-5',
    label: 'ID 2-5',
    type: 2,
    options: {
      value1: ['v1aaa', 'v1bbb', 'v1ccc'],
      value2: ['v2aaa', 'v2bbb', 'v2ccc'],
    },
    variant: 3,
    editDisabledValues: ['value1'],
  },

  {
    id: 'id3-1',
    label: 'ID 3-1',
    type: 3,
    options: {},
    ctaType: 'Button',
    ctaLabel: 'Click',
  },
  {
    id: 'id3-2',
    label: 'ID 3-2',
    type: 3,
    options: {},
    ctaType: 'checkbox',
    ctaLabel: 'Check',
  },
  {
    id: 'id3-3',
    label: 'ID 3-3',
    type: 3,
    options: {},
    ctaType: 'checkbox',
    ctaLabel: 'Check',
    editDisabledValues: ['value1'],
  },

  {
    id: 'id4-1',
    label: 'ID 4-1',
    type: 4,
    options: {},
    ctaType: 'switch',
    ctaLabel: 'Switch',
  },
  {
    id: 'id4-2',
    label: 'ID 4-2',
    type: 4,
    options: {},
    ctaType: 'checkbox',
    ctaLabel: 'Check',
  },
  {
    id: 'id4-3',
    label: 'ID 4-3',
    type: 4,
    options: {},
    ctaType: 'button',
    ctaLabel: 'Click',
  },

  {
    id: 'id5-1',
    label: 'ID 5-1',
    type: 5,
    options: {
      value1: ['v1aaa', 'v1bbb', 'v1ccc'],
      value2: ['v2aaa', 'v2bbb', 'v2ccc'],
      value3: ['v3aaa', 'v3bbb', 'v3ccc'],
    },
  },
  {
    id: 'id5-2',
    label: 'ID 5-2',
    type: 5,
    options: {
      value1: ['v1aaa', 'v1bbb', 'v1ccc'],
      value2: ['v2aaa', 'v2bbb', 'v2ccc'],
      value3: ['v3aaa', 'v3bbb', 'v3ccc'],
    },
    editDisabledValues: ['value1', 'value2'],
  },
  {
    id: 'id6',
    label: 'ID 6',
    type: 6,
    options: {},
  },
];

const generateTableData: generateTableDataT<boolean> = () => {
  const rowData = {
    'id7': { address: {} },
    'id1-1': { value1: 'aaa' },
    'id1-2': { value1: 'aaa' },
    'id1-3': { value1: 'aaa' },

    'id2-1': { value1: 'aaa', value2: 'bbb' },
    'id2-2': {
      value1: 'aaaa',
      value2: 'bbb',
    },
    'id2-3': { value1: 'aaa', value2: 'bbb' },
    'id2-4': { value1: 'aaa', value2: 'bbb' },
    'id2-5': { value1: 'aaa', value2: 'bbb' },

    'id3-1': { value1: 'aaa' },
    'id3-2': { value1: 'aaa', ctaChecked: true },
    'id3-3': { value1: 'aaa', ctaChecked: true },

    'id4-1': {},
    'id4-2': {},
    'id4-3': {},

    'id5-1': { value1: 'aaa', value2: 'bbb', value3: 'ccc' },
    'id5-2': { value1: 'aaa', value2: 'bbb', value3: 'ccc' },
    id6: {},
  };
  return Array(500).fill(rowData);
};

const TableData: readonly RowData[] = generateTableData();

export default TableData;