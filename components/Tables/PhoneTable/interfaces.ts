interface IRowsPersonEmploymentTable {
  id: string;
  phone_number: string;
  cell: string;
  card: string;
  doNotCall: string;
  phone_type: string;
  comments: string;
  date_first_known_valid: string;
  date_last_known_valid: string;
  date_marked_invalid: string;
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
