interface IRowsPersonEmploymentTable {
  id: string;
  url: string;
  comments: string;
  crawl: boolean;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  url: string;
  crawl: boolean;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
