interface IRowsPersonEmploymentTable {
  id: string;
  campus: string;
  superArea: string;
  area: string;
  turf: string;
  informationSource: string;
  suppress: boolean;
  pi: boolean;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  campus: string;
  superAreaArea: string;
  turf: string;
  informationSource: string;
  suppress: string;
  pi: string;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
