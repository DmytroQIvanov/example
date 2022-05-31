import { useState } from "react";

export const useTableWrapper = (rows: any[]) => {
  const [tableElements, setTableElements] = useState(rows);
  const [temporallyTableElements, setTemporallyTableElements] = useState(rows);
  const [addStateBoolean, setAddStateBoolean] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const onChangeAddState = () => {
    console.log(alreadyAdded);
    if (!alreadyAdded) {
      setTemporallyTableElements([
        ...tableElements,
        {
          id: tableElements[tableElements.length - 1].id + 1 || 0,
          addStateBoolean: true,
          //TODO
        },
      ]);
      setAddStateBoolean(true);
      setAlreadyAdded(true);
    }
  };

  const onSave = () => {
    setTableElements(temporallyTableElements);
    setAddStateBoolean(false);
    setAlreadyAdded(false);
  };
  const onCancel = () => {
    setAlreadyAdded(false);
  };

  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
    console.log(tableElements);
  };
  return {
    onSave,
    onCancel,
    tableElements: addStateBoolean ? temporallyTableElements : tableElements,
    onChangeAddState,
    onDelete,
  };
};
