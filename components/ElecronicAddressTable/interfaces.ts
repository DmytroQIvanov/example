interface IRowsPersonEmploymentTable {
  id: string;
  electronicAddress: string;
  electronicType: string;
  source: string;
  emailOptions: boolean;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  electronicAddress: string;
  electronicType: string;
  source: string;
  emailOptions: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
