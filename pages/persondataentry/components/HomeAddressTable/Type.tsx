import { HeaderCellData, RowData } from "../../../../components/Table/Type";

export const HeaderData: HeaderCellData[] = [
  {
    id: "home-address",
    label: "Home Address",
    type: 1,
    options: {},
    variant: 1,
  },
  {
    id: "location-accuracy",
    label: "Location Accuracy",
    type: 1,
    options: {},
    variant: 1,
  },
  {
    id: "source",
    label: "Source",
    type: 1,
    options: {},
    variant: 1,
  },
  {
    id: "comments",
    label: "Comments",
    type: 1,
    options: {},
    variant: 1,
  },

  {
    id: "dfku",
    label: "DFKV",
    type: 1,
    options: {},
    variant: 1,
  },
  {
    id: "dlkv",
    label: "DLKV",
    type: 3,
    options: {},
    ctaType: "Button",
    ctaLabel: "Validate",
  },
  {
    id: "marked-invalid",
    label: "Marked Invalid",
    type: 3,
    options: {},
    ctaType: "checkbox",
    ctaLabel: "Inactivate",
  },
  {
    id: "options",
    label: "Options",
    type: 7,
    options: {},
    ctaLabel: "",
  },
];

const generateTableData = () => {
  const rowData = {
    "home-address": { value1: "123 Main Street APT 4, Eureka City CA 900223" },
    "location-accuracy": { value1: "ROOFTOP" },
    source: { value1: "On the Ground" },
    comments: { value1: "The address shared with 2 other workers" },
    dfku: { value1: "01/01/2021" },
    dlkv: { value1: "01/01/2021" },
    "marked-invalid": { value1: "01/05/2021", ctaChecked: true },
    options: { address: {}, datemarkedinvalid: true },
  };
  return Array(2).fill(rowData);
};

const TableData: readonly RowData[] = generateTableData();

export default TableData;
