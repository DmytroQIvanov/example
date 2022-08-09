import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { DocumentNode } from "graphql";

const UseTableValues = ({
  schemas: { createSchema, changeSchema, deleteSchema, querySchema },
  tableNames: { idName, tableName },
  customVariables,
}: {
  schemas: {
    createSchema?: DocumentNode;
    changeSchema?: DocumentNode;
    deleteSchema?: DocumentNode;
    querySchema?: DocumentNode;
  };
  tableNames: { idName: string; tableName: string };
  customVariables?: any;
}) => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [tableElements, setTableElements] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const queryResult =
    querySchema &&
    useQuery(querySchema, {
      variables: customVariables || { pid: router.query.id },
      skip: !router.query.id,
    });

  useEffect(() => {
    if (queryResult?.data?.[tableName])
      setTableElements(() =>
        queryResult?.data?.[tableName].map((elem: any) => {
          return {
            id: elem[idName],
            ...elem,
            validateState: Boolean(elem.date_marked_invalid),
          };
        })
      );
  }, [queryResult?.data?.[tableName]]);

  const changeMutation = changeSchema && useMutation(changeSchema);
  const createMutation = createSchema && useMutation(createSchema);
  const deleteMutation = deleteSchema && useMutation(deleteSchema);

  const changeFunction = (state: any) => {
    changeMutation &&
      changeMutation[0]({ variables: { ...state } })
        .then(() => {
          queryResult?.refetch();
        })
        .catch((reason) => {
          setErrorMessage(reason);
          console.log("ERROR///" + " " + reason);
        });
  };
  const deleteFunction = (state: any) => {
    deleteMutation &&
      deleteMutation[0]({ variables: { ...state } })
        .then(() => {
          queryResult?.refetch();
        })
        .catch((reason) => {
          setErrorMessage(reason);
          console.log("ERROR///" + " " + reason);
        });
  };
  const createFunction = (state: any) => {
    createMutation &&
      createMutation[0]({ variables: { ...state } })
        .then(() => {
          queryResult?.refetch();
        })
        .catch((reason) => {
          setErrorMessage(reason);
          console.log("ERROR///" + " " + reason);
        });
  };

  return {
    functions: {
      changeFunction,
      createFunction,
      deleteFunction,
    },
    refetch: queryResult?.refetch,
    alert: { successAlert, setSuccessAlert },
    tableElements,
    error: { setErrorMessage, errorMessage },
  };
};

export default UseTableValues;
