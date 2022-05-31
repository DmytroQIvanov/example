interface IRowsPersonEmploymentTable {
  id: string;
  date: string;
  type: string;
  oldValue: string;
  newValue: string;
  createdBy: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  date: string;
  type: string;
  oldValue: string;
  newValue: string;
  createdBy: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
