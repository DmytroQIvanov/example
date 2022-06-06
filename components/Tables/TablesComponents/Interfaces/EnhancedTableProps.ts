import { Order } from "./Order";

export interface EnhancedTableProps<IRowsPersonEmploymentTable, HeadCell> {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: IRowsPersonEmploymentTable
  ) => void;
  order: Order;
  orderBy: string;
  headCells: readonly HeadCell[];
}
