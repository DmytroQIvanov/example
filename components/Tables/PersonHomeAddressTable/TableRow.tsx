import React, { CSSProperties, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//INTERFACES
import { IRowsPersonEmploymentTable } from "./interfaces";

//ICONS
import EditableBlock from "../TablesComponents/EditableBlock";
import { UseEditableTable } from "../../../hooks/UseEditableTable";
import OptionsBlock from "../TablesComponents/OptionsBlock";
import AddressEditModal from "../../Table/RowCells/AddressEditModal";

const TableRowComponent: React.FC<{
  row: IRowsPersonEmploymentTable;
  onDelete: (id: string | undefined) => void;
  onAddSave: Function;
  onAddCancel: Function;
  stateModal: boolean;
  onHandleOpen: () => void;
  onHandleClose: () => void;
}> = ({
  row,
  onDelete,
  onAddSave,
  onAddCancel,
  onHandleOpen,
  onHandleClose,
  stateModal,
}) => {
  const {
    onCancel,
    handleChange,
    editStateBoolean,
    handleChangeEvent,
    handleEditableState,
    onSave,
    editState,
    validateState,
    onChangeValidateState,
  } = UseEditableTable(row);

  const SummaryObject = {
    handleChangeEvent,
    handleChange,
    summaryState: editState,
    editStateBoolean,
    titleVisibly: false,
  };

  const [state2, useState2] = useState<any>({
    street_number: "",
    street: "",
    city: "",
    state: "",
    country: "",
    full: "",
    source: "",
    comments: "",
  });
  useEffect(() => {
    console.log(state2);
  }, [state2]);
  return (
    <TableRow style={!validateState ? { backgroundColor: "#ececec" } : {}}>
      <TableCell component="th" scope="row" width={"200px"}>
        {/*{EditableBlock({*/}
        {/*  ...SummaryObject,*/}
        {/*  name: "homeAddress",*/}
        {/*})}*/}

        {/*{state2["street_number"]}*/}
        {/*{state2["street"]}*/}

        {state2["full"]}
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {/*{EditableBlock({*/}
        {/*  ...SummaryObject,*/}
        {/*  name: "locationAccuracy",*/}
        {/*})}*/}
        {state2["city"]} {state2["state"]}
        {state2["country"]}
      </TableCell>

      <TableCell component="th" scope="row" width={"200px"}>
        {/*{EditableBlock({*/}
        {/*  ...SummaryObject,*/}
        {/*  name: "source",*/}
        {/*})}*/}
        {state2["source"]}
      </TableCell>

      <TableCell component="th" scope="row" width={"340px"}>
        {/*{EditableBlock({*/}
        {/*  ...SummaryObject,*/}
        {/*  name: "comments",*/}
        {/*  multiline: 6,*/}
        {/*  width: 100,*/}
        {/*})}*/}
        {state2["comments"]}
      </TableCell>
      <TableCell component="th" scope="row" width={"200px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dfkv",
        })}
      </TableCell>

      <TableCell width={"220px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "dlkv",
          type: "date",

          validate: {
            disabled: !validateState,
            label: "validate",
            onClick: () => onChangeValidateState(true),
          },
        })}
      </TableCell>
      <TableCell width={"230px"}>
        {EditableBlock({
          ...SummaryObject,
          name: "marketInvalid",
          type: "date",
          checkBox: {
            label: "Invalidate",
            onClick: () => onChangeValidateState(!validateState),
            value: !validateState,
            disabled: !validateState,
          },
        })}
      </TableCell>

      <TableCell width={"130px"}>
        <OptionsBlock
          editStateBoolean={editStateBoolean}
          onSave={() => {
            editStateBoolean === "add" && onAddSave();
            onSave();
          }}
          onCancel={editStateBoolean === "add" ? onAddCancel : onCancel}
          handleEditableState={handleEditableState}
          onDelete={onDelete}
          id={row.id}
          validateState={validateState}
          documentElement
        />
      </TableCell>
      <AddressEditModal
        data={row}
        open={stateModal}
        handleClose={onHandleClose}
        onChangeAddress={useState2}
      />
    </TableRow>
  );
};

export default TableRowComponent;
