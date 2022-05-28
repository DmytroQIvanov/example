import React, { useEffect, useState } from "react";

export const UseEditableTable = (row: any) => {
  //STATES
  const [editStateBoolean, setEditStateBoolean] = useState(false);
  const [rowState, setRowState] = useState(row);
  const [editState, setEditState] = useState<typeof row>(row);
  const [validateState, setValidateState] = useState(true);

  //HANDLERS
  const handleEditableState = () => {
    setEditStateBoolean((prevState) => !prevState);
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
  const handleChange = (name: string, text: string | number) => {
    setEditState((prevState) => {
      return {
        ...prevState,
        [name]: text.toString(),
      };
    });
  };
  const onChangeValidateState = (state?: boolean) => {
    setValidateState((prevState) => {
      if (state && typeof state === "boolean") return state;
      return !prevState;
    });
  };
  const onSave = () => {
    setRowState(editState);
    setEditStateBoolean(false);
  };
  const onCancel = () => {
    setEditState(rowState);
    setEditStateBoolean(false);
  };

  //USE-EFFECTS
  useEffect(() => {
    setRowState(row);
  }, [row]);

  useEffect(() => {
    setEditState(rowState);
  }, [editStateBoolean]);

  return {
    handleEditableState,
    handleChangeEvent,
    handleChange,
    onSave,
    onCancel,
    editState,
    editStateBoolean,
    onChangeValidateState,
    validateState,
  };
};
