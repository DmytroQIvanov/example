import React, { MouseEventHandler } from "react";
import { Order } from "./Order";

export type RowStateTypes = "add" | "change" | "default";

export interface IActiveRow {
  number: string | null;
  state: RowStateTypes;
}
export interface IActiveRowObject {
  activeRow: IActiveRow;
  handleRowState: (id: string | null, state: RowStateTypes) => void;
}

export interface ITableWrapperProps {
  children: (props: {
    descendingComparator: any;
    getComparator: any;
    stableSort: any;
    EnhancedTableHead: React.FC<{
      order: Order;
      orderBy: any;
      onRequestSort: any;
      headCells: any;
    }>;
    tableElements: any;
    onDelete: (id: string | undefined) => void;
    onSave: Function;
    onCancel: Function;
    onSaveWithProvidedState: (state: any) => void;
    activeRowObject: IActiveRowObject;
    handleChangeAddedRow: (name: string, value: any) => void;
  }) => React.ReactNode;
  buttonsList?: [
    { label: string; buttonFunction?: MouseEventHandler<HTMLButtonElement> }
  ];
  rows: any[];
  disableAddBtn?: boolean;
}
