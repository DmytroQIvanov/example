interface IRowsPersonEmploymentTable {
  id: string;
  phoneNumber: string;
  cell: string;
  card: string;
  doNotCallDate: string;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  phoneNumber: string;
  phonyType: string;
  infoSource: string;
  doNotCallDate: string;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
