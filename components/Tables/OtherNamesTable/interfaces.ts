interface IRowsPersonEmploymentTable {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  nick_name: string;
  suffix: string;
  // person_id: string;
  validateState: boolean;
  person_other_name_id: string;
  date_first_known_valid: string;
  date_last_known_valid: string;
  date_marked_invalid: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  nameSource: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  nick_name: string;
  date_first_known_valid: string;
  date_last_known_valid: string;
  date_marked_invalid: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
