import { IActiveRowObject } from "./TableWrapperInterfaces";

export interface ITableRowComponent<IRowsPersonEmploymentTable> {
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddCancel: Function;
  handleChangeMainStateEvent: any;
  handleChangeMainState: any;
  activeRowObject: IActiveRowObject;
  onSaveWithProvidedState: (state: any) => void;
  onChangeWithProvidedState: (state: any) => void;
}
