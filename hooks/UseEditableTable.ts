import React, { useEffect, useState } from "react";
import { IActiveRowObject } from "../components/Tables/TablesComponents/Interfaces/TableWrapperInterfaces";

export type rowStateTypes = "default" | "change" | "add";

export interface ISummaryObject {
  handleChange: (name: string, text: string | number | boolean | Date) => void;
  handleChangeEvent: (
    event: React.ChangeEvent<any>
    // | React.ChangeEvent<HTMLInputElement>
  ) => void;
  validateState: boolean;
  changeValidateState: (state?: boolean) => void;
  rowState: rowStateTypes;
  changeRowState: () => void;
  rowValues: { [index: string]: any };
  saveWithProvidedState: (state: any) => void;
}

interface IUseEditableTableReturns {
  onSave: () => void;
  onCancel: () => void;
  changeRowState: () => void;
  summaryObject: ISummaryObject;
}
export const UseEditableTable = ({
  activeRowObject,
  row,
  handleChangeAddedRow,
}: {
  activeRowObject: IActiveRowObject;
  row?: any;
  handleChangeAddedRow: (name: string, value: any) => void;
}): IUseEditableTableReturns => {
  // ---STATES---

  // SAVED ROW VALUES
  const [rowValues, setRowValues] = useState(row);

  // NOT SAVED ROW STATE
  const [editableRowValues, setEditableRowValues] = useState<typeof row>(row);

  // ROW STATE (ADD/CHANGE/DEFAULT)
  const [rowState, setRowState] = useState<rowStateTypes>(
    row?.addStateBoolean ? "add" : "default"
  );

  useEffect(() => {
    if (activeRowObject.activeRow.number === row.id) {
      setRowState(activeRowObject.activeRow.state);
    } else {
      setRowState("default");
    }
  }, [activeRowObject.activeRow]);

  // IS ROW VALIDATED
  const [validateState, setValidateState] = useState(
    row?.datemarkedinvalid ? true : false
  );

  // ---FUNCTIONS---

  // CHANGE ROW STATE (ADD/CHANGE/DEFAULT)
  const changeRowState = () => {
    const result = rowState == "default" ? "change" : "default";

    setRowState(result);
    activeRowObject.handleRowState(rowValues.id, result);
  };

  // SAVE WITH PROVIDED STATE
  const saveWithProvidedState = (state: any) => {
    setEditableRowValues(state);
    setRowValues(state);
  };

  // CHANGE VALIDATE STATE
  const changeValidateState: (state?: boolean) => void = (state?: boolean) => {
    setValidateState((prevState) => {
      if (state != undefined) return state;
      return !prevState;
    });
  };

  const onSave = () => {
    setRowValues({
      ...editableRowValues,
      rowState,
      datemarkedinvalid: validateState,
    });

    setRowState("default");

    activeRowObject.handleRowState(null, "default");
  };

  const onCancel = () => {
    setEditableRowValues(rowValues);
    setRowState("default");

    activeRowObject.handleRowState(null, "default");
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
    value: string | number | boolean | Date
  ) => {
    setEditableRowValues((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
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
    if (rowState === "default") {
      setRowValues((prevValues: any) => {
        return {
          ...prevValues,
          datemarkedinvalid: validateState,
        };
      });
    }
  }, [validateState]);

  return {
    onSave,
    onCancel,
    changeRowState,

    summaryObject: {
      rowValues:
        activeRowObject.activeRow.number === rowValues.id &&
        activeRowObject.activeRow.state === "change"
          ? editableRowValues
          : rowValues,
      handleChange:
        // activeRowObject.activeRow.number === rowValues.id &&
        activeRowObject.activeRow.state === "add"
          ? handleChangeAddedRow
          : handleChange,
      rowState,
      changeRowState,
      handleChangeEvent,
      validateState,
      changeValidateState,
      saveWithProvidedState,
    },
  };
};
