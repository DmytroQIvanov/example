import React, { useEffect, useState } from "react";
import { IActiveRowObject } from "../components/Tables/TablesComponents/Interfaces/TableWrapperInterfaces";
import { dateOptions } from "../components/Tables/TablesComponents/EditableBlock/Components/dateOptions";
import { DocumentNode } from "graphql";
import { useMutation } from "@apollo/client";
import {
  INVALIDATE_PERSON_HOME_ADDRESS,
  VALIDATE_PERSON_HOME_ADDRESS,
} from "../schemas/HomeAddressSchemas";

export type rowStateTypes = "default" | "change" | "add";

export interface ISummaryObject {
  handleChange: (name: string, text: string | number | boolean | Date) => void;
  handleChangeEvent: (event: React.ChangeEvent<any>) => void;
  validateState: boolean;
  changeValidateState: (state?: boolean, validate?: boolean) => void;
  rowState: rowStateTypes;
  changeRowState: () => void;
  rowValues: { [index: string]: any };
  saveWithProvidedState: (state: any) => void;
  activeRowObject: IActiveRowObject;
  editableRowValues: any;
  handleChangeArray: Function;
}

export const UseEditableTable = ({
  activeRowObject,
  row,
  onChangeWithProvidedState,
  onSaveWithProvidedState,
  onAddCancel,
  refetch,
  // invalidateFunction,
  // validateFunction,
  handleErrorMessage,
  dmiNullFunction,
  validateSchema,
  invalidateSchema,
}: {
  activeRowObject: IActiveRowObject;
  row?: any;
  onChangeWithProvidedState: any;
  onSaveWithProvidedState: any;
  onAddCancel: any;
  refetch?: Function;
  // invalidateFunction?: Function;
  // validateFunction?: Function;
  handleErrorMessage?: (value: string) => void;
  dmiNullFunction?: Function;

  invalidateSchema?: DocumentNode;
  validateSchema?: DocumentNode;
}): {
  onSave: () => void;
  onCancel: () => void;
  summaryObject: {
    changeValidateState: (state?: boolean, validate?: boolean) => void;
    handleChangeArray: (
      data: { name: string; value: string | number | boolean | Date }[]
    ) => void;
    activeRowObject: IActiveRowObject;
    handleChange: (
      name: string,
      value: string | number | boolean | Date
    ) => void;
    rowState: "default" | "change" | "add";
    saveWithProvidedState: (state: any) => void;
    rowValues: any;
    changeRowState: () => void;
    validateState: any;
    editableRowValues: any;
    handleChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  changeRowState: () => void;
} => {
  // ---STATES---

  // SAVED ROW VALUES
  const [rowValues, setRowValues] = useState(row);

  // NOT SAVED ROW STATE
  // const [editableRowValues, setEditableRowValues] = useState(row);
  const [editableRowValues, setEditableRowValues] = useState(row);

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

  // useEffect(() => {
  //   onChangeWithProvidedState(rowValues);
  // }, [rowValues]);

  // IS ROW VALIDATED
  const [validateState, setValidateState] = useState(
    row?.validateState || false
  );
  const [validateStateChanged, setValidateStateChanged] = useState(false);

  // ---FUNCTIONS---

  // CHANGE ROW STATE (ADD/CHANGE/DEFAULT)
  const changeRowState = () => {
    const result = rowState == "default" ? "change" : "default";

    setRowState(result);
    activeRowObject.handleRowState(rowValues.id, result);
  };
  const validateValue = validateSchema && useMutation(validateSchema);
  const invalidateValue = invalidateSchema && useMutation(invalidateSchema);

  // SAVE WITH PROVIDED STATE
  const saveWithProvidedState = (state: any) => {
    setEditableRowValues(state);
    setRowValues(state);
  };
  const func2 = ({
    prevState,
    value,
    name,
  }: {
    prevState: any;
    value: any;
    name: string;
  }) => {
    const result = name.toString().split(".");
    if (result.length === 2) {
      return {
        [result[0]]: { ...prevState[result[0]], [result[1]]: value },
      };
    } else if (result.length === 3) {
      // let object = prevState;
      //
      // object[result[0]][result[1]][result[2]] = value;
      // return object;
      return {
        [result[0]]: {
          ...prevState[result[0]],
          [result[1]]: {
            ...prevState[result[1]],
            [result[2]]: value,
          },
        },
      };
    } else {
      return { [name]: value };
    }
  };

  const func3 = (
    data: {
      prevState: any;
      value: any;
      name: string;
    }[]
  ) => {
    let object = data[0].prevState;

    data.forEach(({ prevState, value, name }) => {
      const result = name.toString().split(".");
      if (result.length === 2) {
        object = {
          ...object,
          [result[0]]: { ...object[result[0]], [result[1]]: value },
        };
      } else if (result.length === 3) {
        object = {
          ...object,
          [result[0]]: {
            ...object[result[0]],
            [result[1]]: {
              ...object[result[0]][result[1]],
              [result[2]]: value,
            },
          },
        };
      } else {
        object = { ...object, [name]: value };
      }
    });
    return object;
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
        prevState2["date_last_known_valid"] = pst;
        prevState2["dmi"] = null;
        prevState2["date_marked_invalid"] = null;

        const validatePromise =
          validateValue &&
          validateValue[0] &&
          validateValue[0]({
            variables: { id: prevState2.id, date: pst },
          }).catch(handleErrorMessage);

        let dmiNullPromise =
          dmiNullFunction &&
          dmiNullFunction({
            variables: { id: prevState2.id },
          });
        Promise.all([validatePromise, dmiNullPromise]).then(() => {
          refetch && refetch();
        });

        return prevState2;
      });
      setEditableRowValues((prevState2: any) => {
        const date = new Date();
        const pst = date.toLocaleString("en-US", dateOptions);
        prevState2["date_last_known_valid"] = pst;
        prevState2["date_marked_invalid"] = null;

        return prevState2;
      });
    }

    setValidateState((prevState: any) => {
      if (
        activeRowObject.activeRow.state === "default" &&
        state === undefined &&
        validate === undefined
      ) {
        const date = new Date();
        const pst = date.toLocaleString("en-US", dateOptions);

        invalidateValue &&
          invalidateValue[0] &&
          invalidateValue[0]({
            variables: { id: rowValues.id, date: pst },
          })
            .then(() => {
              refetch && refetch();
            })
            .catch(handleErrorMessage);
        setRowValues((prevState2: any) => {
          prevState2["date_marked_invalid"] = pst;

          return prevState2;
        });
        setEditableRowValues((prevState2: any) => {
          prevState2["date_marked_invalid"] = pst;

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
    setEditableRowValues(row);
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

    setEditableRowValues((prevState: any) => {
      return {
        ...prevState,
        ...func2({ value, name, prevState }),
      };
    });
  };

  // HANDLE CHANGE EDITABLE ROW VALUES (NAME && TEXT IN PROPS)
  const handleChangeArray = (
    data: {
      name: string;
      value: string | number | boolean | Date;
    }[]
  ) => {
    setEditableRowValues((prevState: any) => {
      return func3(
        data.map((elem) => {
          return { ...elem, prevState };
        })
      );
    });
  };
  const handleChange = (
    name: string,
    value: string | number | boolean | Date
  ) => {
    if (activeRowObject.checkActiveRow(row.id, "default")) {
      setRowValues((prevState: any) => {
        return {
          ...prevState,

          ...func2({ value, name, prevState }),
        };
      });
    } else {
      setEditableRowValues((prevState: any) => {
        return {
          ...prevState,

          ...func2({ value, name, prevState }),
        };
      });
    }
  };

  // ---USE-EFFECTS---

  // IF GENERAL ROW STATE CHANGES THAN THE STATE CHANGES HERE
  useEffect(() => {
    setEditableRowValues(row);
    setRowValues(row);
  }, [row]);

  useEffect(() => {
    setEditableRowValues((prevState: any) => {
      return { ...prevState, validateState };
    });
    setRowValues((prevState: any) => {
      return { ...prevState, validateState };
    });
  }, [validateState]);

  // IF ROW STATE CHANGES THAN THE EDITABLE ROW VALUES CHANGES TO DEFAULT STATE
  useEffect(() => {
    setEditableRowValues(Object.assign({}, row));
  }, [activeRowObject.activeRow.number]);

  // ROW STATE
  useEffect(() => {
    if (activeRowObject.activeRow.state == "default")
      setRowValues((prevValues: any) => {
        return {
          ...prevValues,
          validateState,
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
      handleChangeArray,
      rowState,
      changeRowState,
      validateState,
      changeValidateState,
      saveWithProvidedState,
      activeRowObject,
    },
  };
};
