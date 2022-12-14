interface IRowsPersonEmploymentTable {
  id: string;
  campus: string;
  location1: string;
  location2: string;
  informationSource: string;
  primary: boolean;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;

  campus: string;
  location: string;
  informationSource: string;
  primary: boolean;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
