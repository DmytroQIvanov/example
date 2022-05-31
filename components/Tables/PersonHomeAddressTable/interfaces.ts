// interface IRowsPersonEmploymentTable {
//   id: string;
//   homeAddress: string;
//   locationAccuracy: string;
//   source: string;
//   comments: string;
//   dfkv: string;
//   dlkv: string;
//   marketInvalid: string;
//   options?: string;
// }
// interface IColumnsPersonEmploymentTable {
//   id: string;
//   homeAddress: string;
//   locationAccuracy: string;
//   source: string;
//   comments: string;
//   dfkv: string;
//   dlkv: string;
//   marketInvalid: string;
//   options: string;
// }
interface IRowsPersonEmploymentTable {
  id: string;
  street_number: string;
  street: string;
  source: string;
  apt: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  comments: string;
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
