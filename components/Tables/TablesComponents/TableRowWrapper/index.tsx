import React from "react";
import { ISummaryObject } from "../../../../hooks/UseEditableTable";
import TableRow from "@material-ui/core/TableRow";

const Index: React.FC<{
  summaryObject: ISummaryObject;
  children: React.ReactNode;
}> = ({ summaryObject, children }) => {
  console.log("rowValues", summaryObject.rowValues);
  return (
    <TableRow
      style={
        summaryObject.rowValues.validateState
          ? { backgroundColor: "#ececec" }
          : {}
      }
    >
      {children}
    </TableRow>
  );
};

export default Index;
