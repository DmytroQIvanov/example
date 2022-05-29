interface IRowsPersonEmploymentTable {
  id: string;
  homeAddress: string;
  locationAccuracy: string;
  source: string;
  comments: string;
  dfkv: string;
  dlkv: string;
  marketInvalid: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  homeAddress: string;
  locationAccuracy: string;
  source: string;
  comments: string;
  dfkv: string;
  dlkv: string;
  marketInvalid: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
