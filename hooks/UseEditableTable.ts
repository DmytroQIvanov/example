import React, { useEffect, useState } from "react";

enum rowStateEnum {
  default = "default",
  change = "change",
  add = "add",
}

export interface ISummaryObject {
  handleChange: (name: string, text: string | number | boolean | Date) => void;
  handleChangeEvent: (
    event: React.ChangeEvent<any>
    // | React.ChangeEvent<HTMLInputElement>
  ) => void;
  validateState: boolean;
  changeValidateState: (state?: boolean) => void;
  rowState: rowStateEnum;
  changeRowState: () => void;
  rowValues: { [index: string]: any };
}

interface IUseEditableTableReturns {
  onSave: () => void;
  onCancel: () => void;
  changeRowState: () => void;
  summaryObject: ISummaryObject;
}
export const UseEditableTable = (row?: any): IUseEditableTableReturns => {
  // ---STATES---

  // SAVED ROW VALUES
  const [rowValues, setRowValues] = useState(row);

  // NOT SAVED ROW STATE
  const [editableRowValues, setEditableRowValues] = useState<typeof row>(row);

  // ROW STATE (ADD/CHANGE/DEFAULT)
  const [rowState, setRowState] = useState<rowStateEnum>(
    row?.addStateBoolean ? rowStateEnum.add : rowStateEnum.default
  );

  // IS ROW VALIDATED
  const [validateState, setValidateState] = useState(true);

  // ---FUNCTIONS---

  // CHANGE ROW STATE (ADD/CHANGE/DEFAULT)
  const changeRowState = () => {
    setRowState((prevState) => {
      if (prevState == rowStateEnum.default) return rowStateEnum.change;
      return rowStateEnum.default;
    });
  };

  // SAVE WITH PROVIDED STATE
  const saveWithProvidedState = (state: any) => {
    setEditableRowValues(state);
    setRowValues(state);
  };

  // CHANGE VALIDATE STATE
  const changeValidateState: (state?: boolean) => void = (state?: boolean) => {
    setValidateState((prevState) => {
      if (state && typeof state === "boolean") return state;
      return !prevState;
    });
  };

  const onSave = () => {
    setRowValues({ ...editableRowValues, rowState, validateState });
    setRowState(rowStateEnum.default);
  };

  const onCancel = () => {
    setEditableRowValues(rowValues);
    setRowState(rowStateEnum.default);
  };

  // ---HANDLERS---

  // HANDLE CHANGE EDITABLE ROW VALUES (EVENT IN PROPS)
  const handleChangeEvent = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setEditableRowValues((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // HANDLE CHANGE EDITABLE ROW VALUES (NAME && TEXT IN PROPS)
  const handleChange = (
    name: string,
    text: string | number | boolean | Date
  ) => {
    setEditableRowValues((prevState: any) => {
      return {
        ...prevState,
        [name]: text,
      };
    });
  };

  // ---USE-EFFECTS---

  // IF GENERAL ROW STATE CHANGES THAN THE STATE CHANGES HERE
  useEffect(() => {
    setRowValues(row);
    setEditableRowValues(rowValues);
  }, [row]);

  // IF ROW STATE CHANGES THAN THE EDITABLE ROW VALUES CHANGES TO DEFAULT STATE
  useEffect(() => {
    setEditableRowValues(rowValues);
  }, [rowState]);

  // ROW STATE
  useEffect(() => {
    if (rowState === rowStateEnum.default) {
      setRowValues((prevValues: any) => {
        return {
          ...prevValues,
          validateState,
        };
      });
    }
  }, [validateState]);

  return {
    onSave,
    onCancel,
    // rowState,
    changeRowState,

    summaryObject: {
      rowValues:
        rowState !== rowStateEnum.default ? editableRowValues : rowValues,
      handleChange,
      rowState,
      changeRowState,
      handleChangeEvent,

      // validateState: rowValues.validateState,
      validateState,
      changeValidateState,
    },
  };
};
