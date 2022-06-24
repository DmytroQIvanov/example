interface IRowsPersonEmploymentTable {
  id: string;
  campus: string;
  organization1: string;
  organization2: string;
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
  organization: string;
  informationSource: string;
  primary: string;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
