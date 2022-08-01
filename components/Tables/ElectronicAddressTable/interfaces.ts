interface IRowsPersonEmploymentTable {
  id: string;
  electronic_address: string;
  electronic_type: string;
  information_source_type: string;
  emailOptions: boolean;
  date_first_known_valid: string;
  date_last_known_valid: string;
  date_marked_invalid: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  electronic_address: string;
  electronic_type: string;
  information_source_type: string;
  emailOptions: boolean;
  date_first_known_valid: string;
  date_last_known_valid: string;
  date_marked_invalid: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
