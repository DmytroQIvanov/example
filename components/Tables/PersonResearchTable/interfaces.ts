interface IRowsPersonEmploymentTable {
  id: string;
  date: string;
  comments: string;
  createdBy: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  date: string;
  comments: string;
  createdBy: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
