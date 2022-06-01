import React, { useEffect, useState } from "react";

export const UseEditableTable = (row?: any) => {
  //STATES
  const [stateValue, setStateValue] = useState<"default" | "change" | "add">(
    row?.addStateBoolean ? "add" : "default"
  );
  const [rowState, setRowState] = useState(row);
  const [editState, setEditState] = useState<typeof row>(row);
  const [validateState, setValidateState] = useState(true);

  //HANDLERS
  const handleEditableState = () => {
    setStateValue((prevState) => {
      if (prevState == "default") {
        return "change";
      } else {
        return "default";
      }
    });
  };
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleChange = (
    name: string,
    text: string | number | boolean | Date
  ) => {
    setEditState((prevState) => {
      return {
        ...prevState,
        [name]: text,
      };
    });
  };

  const onChangeWithProvidedState = (state: any) => {
    console.log(state);
    setEditState(state);

    console.log(rowState);
  };
  const onChangeValidateState = (state?: boolean) => {
    setValidateState((prevState) => {
      if (state && typeof state === "boolean") return state;
      return !prevState;
    });
  };
  const onSave = () => {
    setRowState(editState);
    setStateValue("default");
  };
  const onCancel = () => {
    setEditState(rowState);
    setStateValue("default");
  };

  //USE-EFFECTS
  useEffect(() => {
    setRowState(row);
  }, [row]);

  useEffect(() => {
    setEditState(rowState);
  }, [stateValue]);

  return {
    handleEditableState,
    handleChangeEvent,
    handleChange,
    onSave,
    onCancel,
    editState,
    editStateBoolean: stateValue,
    onChangeValidateState,
    validateState,
    onChangeWithProvidedState,
  };
};
