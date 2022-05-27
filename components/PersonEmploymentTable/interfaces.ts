
interface IRowsPersonEmploymentTable {
    id?:string
    jobTitle: string;
    campus:string;
    source:string;
    unit: string;
    dateStart:string;
    dateEnd:string;
    apt:string;
    salary: string;
    comments: string;
    dfkv: string;
    dlkv: string;
    dmi: string;
    options?: string;
}
interface IColumnsPersonEmploymentTable {
    id:string
    jobTitle: string;
    unit: string;
    datesStartDateEnd:string;
    aptSalary:string;
    comments: string;
    dfkv: string;
    dlkv: string;
    dmi: string;
    options: string;
}

export {IRowsPersonEmploymentTable,IColumnsPersonEmploymentTable}