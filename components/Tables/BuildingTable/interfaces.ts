interface IRowsPersonEmploymentTable {
  id: string;
  room: string;
  floor: string;
  locationType: string;
  dateCreated: string;
  locationId: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  room: string;
  floor: string;
  locationType: string;
  dateCreated: string;
  locationId: string;
  options?: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
