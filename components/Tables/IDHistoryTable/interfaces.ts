interface IRowsPersonEmploymentTable {
  id: string;
  campus: string;
  employeeID: string;
  dfkv: string;
  dlkv: string;
  createdBy: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  campus: string;
  employeeID: string;
  dfkv: string;
  dlkv: string;
  createdBy: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
