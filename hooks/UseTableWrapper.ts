import { useEffect, useState } from "react";
import {
  IActiveRow,
  RowStateTypes,
} from "../components/Tables/TablesComponents/Interfaces/TableWrapperInterfaces";

export const useTableWrapper = (rows: any[]) => {
  const [tableElements, setTableElements] = useState(rows);
  const [temporallyTableElements, setTemporallyTableElements] = useState(rows);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [activeRow, setActiveRow] = useState<IActiveRow>({
    state: "default",
    number: null,
  });

  const handleRowState = (id: string | null, state: RowStateTypes) => {
    setActiveRow({ number: id, state: state });
  };
  const onChangeAddState = () => {
    if (!alreadyAdded) {
      const id = temporallyTableElements[tableElements.length - 1]?.id + 1 || 0;
      setTemporallyTableElements([
        ...tableElements,
        {
          id,
        },
      ]);
      setActiveRow({ state: "add", number: id });
      setAlreadyAdded(true);
    }
  };

  useEffect(() => {
    setTableElements(rows);
  }, [rows]);

  const onSave = () => {
    setTableElements(temporallyTableElements);
    setAlreadyAdded(false);
    handleRowState(null, "default");
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

    handleRowState(null, "default");
  };

  const onDelete = (id: string | undefined) => {
    if (!id) return;
    setTableElements(tableElements.filter((elem) => elem.id !== id));
  };
  return {
    onSaveWithProvidedState,
    onSave,
    onCancel,
    tableElements:
      activeRow.state == "add" ? temporallyTableElements : tableElements,
    onChangeAddState,
    onDelete,
    activeRowObject: {
      activeRow,
      handleRowState,
    },
  };
};
