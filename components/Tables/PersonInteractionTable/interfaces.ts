interface IRowsPersonEmploymentTable {
  id: string;
  category: string;
  interaction: string;
  response: string;
  informationSource: string;
  organizers: string;
  interactionDate: string;
  createdBy: string;
  dateCreated: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  category: string;
  interaction: string;
  response: string;
  informationSource: string;
  organizers: string;
  interactionDate: string;
  createdBy: string;
  dateCreated: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
