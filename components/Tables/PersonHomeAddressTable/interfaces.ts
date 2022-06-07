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

  streetnumber: string;
  streetname: string;
  source: string;
  full: string;

  apartment: string;
  zip:string;
  city: string;
  state: string;
  postal: string;
  country: string;
  location_accuracy:string;
  information_source_type?:{informationsourcetypeid:number,informationsourcetype:string}
  comments: string;
  datefirstknownvalid:string;
  datelastknownvalid:string;
  datemarkedinvalid:string;
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
