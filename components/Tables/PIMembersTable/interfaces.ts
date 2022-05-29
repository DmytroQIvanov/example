interface IRowsPersonEmploymentTable {
  id: string;
  personId: string;
  personType: string;
  firstName: string;
  superArea: string;
  locations: string;
  phones: string;
  department: string;
  pi: string;
  card: string;
  activeUnit: string;
  leftUC: string;
  campus: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  personId: string;
  personType: string;
  firstName: string;
  superArea: string;
  locations: string;
  phones: string;
  department: string;
  pi: string;
  card: string;
  activeUnit: string;
  leftUC: string;
  campus: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
