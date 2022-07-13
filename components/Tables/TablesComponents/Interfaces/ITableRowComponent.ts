import { IActiveRowObject } from "./TableWrapperInterfaces";

export interface ITableRowComponent<IRowsPersonEmploymentTable> {
  row: IRowsPersonEmploymentTable;
  onChangeWithProvidedState: (state: any, changingRow?: string) => void;
  onSaveWithProvidedState: (state: any) => void;
  onDelete: (id: string | undefined) => void;
  onAddSave: () => void;
  onAddCancel: Function;
  activeRowObject: IActiveRowObject;

  handleOpenPersonInteractionModal?: () => void;

  refetch?: Function;
}
