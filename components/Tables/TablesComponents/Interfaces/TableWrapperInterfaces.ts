import React, { MouseEventHandler } from "react";
import { Order } from "./Order";

export type RowStateTypes = "add" | "change" | "default";

export interface IActiveRow {
  number: string | number | null;
  state: RowStateTypes;
}
export interface IActiveRowObject {
  activeRow: IActiveRow;
  handleRowState: (id: string | null, state: RowStateTypes) => void;
  checkActiveRow: (id: string, state?: RowStateTypes) => boolean;
}

export interface ITableWrapperProps {
  // children: (props: {
  //   EnhancedTableHead: React.FC<{
  //     order: Order;
  //     orderBy: any;
  //     onRequestSort: any;
  //     headCells: any;
  //     loading?: boolean;
  //   }>;
  //   stableSort: any;
  //   getComparator: any;
  //   descendingComparator: any;
  //
  //   tableElements: any;
  //   // onDelete: (id: string | undefined) => void;
  //   onAddSave: () => void;
  //   handleChangeMainStateEvent: (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => void;
  //
  //   handleChangeMainState: (
  //     name: string,
  //     value: string | number | boolean | Date
  //   ) => void;
  //   onAddCancel: (id: string | undefined) => void;
  //   onSaveWithProvidedState: (state: any) => void;
  //   onChangeWithProvidedState: (state: any) => void;
  //   activeRowObject: IActiveRowObject;
  //   onDelete: Function;
  //   handleErrorMessage: (text: string) => void;
  // }) => React.ReactNode;
  buttonsList?: [
    {
      label: string;
      buttonFunction?: MouseEventHandler<HTMLButtonElement>;
      disabled?: boolean;
    }
  ];
  rows: any[];
  disableAddBtn?: boolean;
  refetch?: Function;
  deleteFunction?: Function;

  onSaveFunction?: Function;
  onChangeFunction?: Function;
  // permissionMessage?: Array;
  errorMessage?: string | null;

  headCells: any;
  TableRowComponent: React.FC<any>;
  addressEditModal?: Function;
}
