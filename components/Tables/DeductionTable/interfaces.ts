interface IRowsPersonEmploymentTable {
  id: string;
  date: string;
  type: string;
  wages: string;
  hours: string;
  deductions: string;
  "%": string;
  jobCode: string;
  report: string;
  transactions: string;
  campus: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  date: string;
  type: string;
  wages: string;
  hours: string;
  deductions: string;
  "%": string;
  jobCode: string;
  report: string;
  transactions: string;
  campus: string;
  options?: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
