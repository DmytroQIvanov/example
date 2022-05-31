interface IRowsPersonEmploymentTable {
  id: string;
  nameSourceType: string;
  nameSourceSubType: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  nickName: string;
  suffix: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  nameSource: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  nickName: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
