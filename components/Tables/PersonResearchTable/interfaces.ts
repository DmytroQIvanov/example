interface IRowsPersonEmploymentTable {
  id: string;
  comments: string;
  created_by: string;
  date_researched: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  date: string;
  comments: string;
  date_researched: string;
  created_by: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
