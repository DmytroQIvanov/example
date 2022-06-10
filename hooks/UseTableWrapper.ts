import {useEffect, useState} from "react";

export const useTableWrapper = (rows: any[]) => {
  const [tableElements, setTableElements] = useState(rows);
  const [temporallyTableElements, setTemporallyTableElements] = useState(rows);
  const [addStateBoolean, setAddStateBoolean] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const onChangeAddState = () => {
    if (!alreadyAdded) {
      setTemporallyTableElements([
        ...tableElements,
        {
          id: tableElements[tableElements.length - 1]?.id + 1 || 0,
          addStateBoolean: true,
          validateState: true,
        },
      ]);
      setAddStateBoolean(true);
      setAlreadyAdded(true);
    }
  };

  useEffect(()=>{
    setTableElements(rows)
  },[rows])

  const onSave = () => {
    // setTemporallyTableElements([...temporallyTableElements])
    setTableElements(temporallyTableElements);
    setAddStateBoolean(false);
    setAlreadyAdded(false);
  };
  const onSaveWithProvidedState = (state: any) => {
    setTableElements((prevState) => [
      ...prevState,
      { ...state, id: prevState.length + 1 },
    ]);
  };
  const onCancel = (id: string | undefined) => {
    setAlreadyAdded(false);
    setTemporallyTableElements(tableElements);
    setTableElements(tableElements.filter((elem) => elem.id !== id));
    setTemporallyTableElements(tableElements.filter((elem) => elem.id !== id));
    setAddStateBoolean(false);
  };

  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
  };
  return {
    onSaveWithProvidedState,
    onSave,
    onCancel,
    tableElements: addStateBoolean ? temporallyTableElements : tableElements,
    onChangeAddState,
    onDelete,
  };
};
