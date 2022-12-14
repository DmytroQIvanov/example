interface IRowsPersonEmploymentTable {
  id: string;
  campus: string;
  location1: string;
  location2: string;
  informationSource: string;
  propagate: boolean;
  primary: boolean;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  primary: string;
  campus: string;
  location: string;
  informationSource: string;
  propagate: boolean;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
