import React, { useEffect, useState } from "react";
import { IActiveRowObject } from "../components/Tables/TablesComponents/Interfaces/TableWrapperInterfaces";
import { dateOptions } from "../components/Tables/TablesComponents/EditableBlock";

export type rowStateTypes = "default" | "change" | "add";

export interface ISummaryObject {
  handleChange: (name: string, text: string | number | boolean | Date) => void;
  handleChangeEvent: (
    event: React.ChangeEvent<any>
    // | React.ChangeEvent<HTMLInputElement>
  ) => void;
  validateState: boolean;
  changeValidateState: (state?: boolean, validate?: boolean) => void;
  rowState: rowStateTypes;
  changeRowState: () => void;
  rowValues: { [index: string]: any };
  saveWithProvidedState: (state: any) => void;
  activeRowObject: IActiveRowObject;
  editableRowValues: any;
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
  onChangeWithProvidedState,
  onSaveWithProvidedState,
  onAddCancel,
}: {
  activeRowObject: IActiveRowObject;
  row?: any;
  onChangeWithProvidedState: any;
  onSaveWithProvidedState: any;
  onAddCancel: any;
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
  const [validateStateChanged, setValidateStateChanged] = useState(false);

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
  const changeValidateState: (state?: boolean, validate?: boolean) => void = (
    state?: boolean,
    validate?: boolean
  ) => {
    if (validate) {
      setRowValues((prevState2: any) => {
        const date = new Date();
        const pst = date.toLocaleString("en-US", dateOptions);
        prevState2["dlkv"] = pst;
        prevState2["datelastknownvalid"] = pst;
        prevState2["dmi"] = null;
        prevState2["datemarkedinvalid"] = null;

        return prevState2;
      });
      setEditableRowValues((prevState2: any) => {
        const date = new Date();
        const pst = date.toLocaleString("en-US", dateOptions);
        prevState2["dlkv"] = pst;
        prevState2["datelastknownvalid"] = pst;
        prevState2["dmi"] = null;
        prevState2["datemarkedinvalid"] = null;

        return prevState2;
      });
    }
    setValidateState((prevState) => {
      if (
        activeRowObject.activeRow.state === "default" &&
        state === undefined &&
        validate === undefined
      ) {
        setRowValues((prevState2: any) => {
          const date = new Date();
          const pst = date.toLocaleString("en-US", dateOptions);
          prevState2["dmi"] = pst;
          prevState2["datemarkedinvalid"] = pst;

          return prevState2;
        });
        setEditableRowValues((prevState2: any) => {
          const date = new Date();
          const pst = date.toLocaleString("en-US", dateOptions);
          prevState2["dmi"] = pst;
          prevState2["datemarkedinvalid"] = pst;

          return prevState2;
        });
        if (state != undefined) return state;
        return !prevState;
      }
      if (state != undefined) return state;
      return !prevState;
    });
  };

  const onSave = () => {
    setRowValues((prevValue: any) => {
      if (activeRowObject.activeRow.state === "add") {
        onAddCancel();
        let state = {
          ...editableRowValues,
          rowState,
          validateState,
        };
        if (validateState) {
          const date = new Date();
          const pst = date.toLocaleString("en-US", dateOptions);
          state["dmi"] = pst;
        }

        onSaveWithProvidedState(state);
      } else {
        const state = {
          ...editableRowValues,
          rowState,
          validateState,
        };
        if (prevValue.validateState !== validateState) {
          const date = new Date();
          const pst = date.toLocaleString("en-US", dateOptions);
          state["dmi"] = pst;
          setValidateStateChanged(true);
        }
        onChangeWithProvidedState(state, rowValues.id);
      }

      return {
        ...editableRowValues,
        rowState,
        validateState,
      };
    });

    setRowState("default");

    activeRowObject.handleRowState(null, "default");
  };

  const onCancel = () => {
    setEditableRowValues(rowValues);
    setRowState("default");
    activeRowObject.activeRow.state === "add" && onAddCancel();

    activeRowObject.handleRowState(null, "default");
  };

  // ---HANDLERS---

  // HANDLE CHANGE EDITABLE ROW VALUES (EVENT IN PROPS)
  const handleChangeEvent = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    console.log(value);
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
    setEditableRowValues(row);
  }, [row]);

  // IF ROW STATE CHANGES THAN THE EDITABLE ROW VALUES CHANGES TO DEFAULT STATE
  useEffect(() => {
    setEditableRowValues(rowValues);
  }, [activeRowObject.activeRow]);

  // ROW STATE
  useEffect(() => {
    if (activeRowObject.activeRow.state == "default")
      setRowValues((prevValues: any) => {
        return {
          ...prevValues,
          validateState,
          // datemarkedinvalid: validateState,
        };
      });
  }, [validateState]);

  return {
    onSave,
    onCancel,
    changeRowState,

    summaryObject: {
      rowValues:
        activeRowObject.activeRow.number === rowValues.id &&
        activeRowObject.activeRow.state !== "default"
          ? editableRowValues
          : rowValues,
      editableRowValues,
      handleChange,
      handleChangeEvent,
      rowState,
      changeRowState,
      validateState,
      changeValidateState,
      saveWithProvidedState,
      activeRowObject,
    },
  };
};
