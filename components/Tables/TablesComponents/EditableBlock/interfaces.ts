import { ISummaryObject } from "../../../../hooks/UseEditableTable";
import { CSSProperties } from "react";

export interface propsBlockWithState extends ISummaryObject {
  title?: string;
  name?: string;
  disabled?: boolean;
  width?: number;
  editable?: boolean;
  itemsArray?: { label: string; id: string }[];
  type?:
    | "textField"
    | "dropdown"
    | "date"
    | "checkBox"
    | "invalidate"
    | "validate";
  multiline?: number;
  titleVisibly?: boolean;
  style?: CSSProperties;
  className?: string;
  availableStateBoolean?: boolean;
  checkBox?: ICheckBox;
  removeComponent?: boolean;
  modifyOnlyExistingField?: boolean;
  value?: string;
  idName?: string;
}

interface ICheckBox {
  label?: string;
  textVariants?: { trueVariant: string; falseVariant: string };
  type?: "green" | "default";
  onClick?: () => void;
  value?: boolean;
  disabled?: boolean;
}
