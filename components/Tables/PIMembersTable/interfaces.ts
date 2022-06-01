interface IRowsPersonEmploymentTable {
  id: string;
  personId: string;
  personType: string;
  firstName: string;
  area: string;
  superArea: string;
  locations: string;
  phones: string;
  department: string;
  pi: string;
  card: string;
  activeUnit: string;
  leftUC: string;
  campus: string;
  lastName: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  personId: string;
  lastName: string;
  area: string;
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
  options?: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
