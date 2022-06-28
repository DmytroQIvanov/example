interface IRowsPersonEmploymentTable {
  id: string;
  organizationType: string;
  organization: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  organizationTypeOrganization: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
