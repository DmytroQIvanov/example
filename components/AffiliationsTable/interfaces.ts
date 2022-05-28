interface IRowsPersonEmploymentTable {
  id: string;
  campus: string;
  source: string;
  unit: string;
  dateStart: string;
  dateEnd: string;
  apt: string;
  salary: string;
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
