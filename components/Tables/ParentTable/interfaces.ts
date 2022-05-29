interface IRowsPersonEmploymentTable {
  id: string;
  typ: string;
  organization: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  createdBy: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  organizationType: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  createdBy: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
