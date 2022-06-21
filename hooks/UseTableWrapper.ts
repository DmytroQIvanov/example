import React, { useEffect, useState } from "react";
import {
  IActiveRow,
  RowStateTypes,
} from "../components/Tables/TablesComponents/Interfaces/TableWrapperInterfaces";

export const useTableWrapper = (rows: any[]) => {
  const [tableElements, setTableElements] = useState<any[]>([]);
  useEffect(() => {
    const result = rows.map((elem) => {
      let result = elem;
      for (const field in elem) {
        if (elem[field] == null) {
          result[field] = "";
        } else {
          result[field] = elem[field];
        }
      }
      return result;
    });

    setTableElements(result);
  }, [rows]);
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

  // HANDLE CHANGE EDITABLE ROW VALUES (EVENT IN PROPS)
  const handleChangeMainStateEvent = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (activeRow.number) {
      const { name, value } = event.target;

      const result = temporallyTableElements.find(
        (elem) => elem.id === activeRow.number
      );
      result[name] = value;
      setTemporallyTableElements((prevState: any) => {
        const newArray = prevState.filter(
          (elem: any) => elem.id !== activeRow.number
        );
        return [...newArray, result];
      });
    }
    console.log(temporallyTableElements);
  };

  // HANDLE CHANGE EDITABLE ROW VALUES (NAME && TEXT IN PROPS)
  const handleChangeMainState = (
    name: string,
    value: string | number | boolean | Date
  ) => {
    if (activeRow.number) {
      const result = temporallyTableElements.find(
        (elem) => elem.id === activeRow.number
      );
      result[name] = value;

      setTemporallyTableElements((prevState: any) => {
        const newArray = prevState.filter(
          (elem: any) => elem.id !== activeRow.number
        );
        // const newArray = prevState.map((elem) =>
        //   elem.filter((elem) => elem.id !== activeRow.number)
        // );
        return [...newArray, result];
      });
    }
    console.log(temporallyTableElements);
  };

  const onAddSave = () => {
    setTableElements(temporallyTableElements);
    setAlreadyAdded(false);
    handleRowState(null, "default");
  };

  const onSaveWithProvidedState = (state: any) => {
    setTableElements((prevState) => [
      ...prevState,
      { ...state, id: Math.floor(Math.random() * (10000 - 1 + 1) + 1) },
    ]);
    console.log(tableElements);
  };
  const onChangeWithProvidedState = (state: any) => {
    setTableElements((prevState) => {
      const result = prevState.filter((elem) => elem.id !== activeRow.number);
      return [...result, state];
    });
  };
  const onAddCancel = (id: string | undefined) => {
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
    onChangeWithProvidedState,
    onAddSave,
    onAddCancel,
    tableElements:
      activeRow.state == "add" ? temporallyTableElements : tableElements,
    onChangeAddState,
    onDelete,
    handleChangeMainStateEvent,
    handleChangeMainState,
    activeRowObject: {
      activeRow,
      handleRowState,
    },
  };
};
