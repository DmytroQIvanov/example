import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { DocumentNode } from "graphql";

const UseTableValues = ({
  schemas: { createSchema, changeSchema, deleteSchema, querySchema },
  tableNames: { idName, tableName },
}: {
  schemas: {
    createSchema: DocumentNode;
    changeSchema: DocumentNode;
    deleteSchema: DocumentNode;
    querySchema: DocumentNode;
  };
  tableNames: { idName: string; tableName: string };
}) => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [tableElements, setTableElements] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const { data, refetch } = useQuery(querySchema, {
    variables: { pid: router.query.id },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (data?.[tableName])
      setTableElements(() =>
        data?.[tableName].map((elem: any) => {
          return {
            id: elem[idName],
            ...elem,
            validateState: Boolean(elem.date_marked_invalid),
          };
        })
      );
  }, [data?.[tableName]]);

  const changeMutation = changeSchema && useMutation(changeSchema);
  const createMutation = createSchema && useMutation(createSchema);
  const deleteMutation = deleteSchema && useMutation(deleteSchema);

  const changeFunction = (state: any) => {
    changeMutation[0](state)
      .then(() => {
        refetch();
      })
      .catch(setErrorMessage);
  };
  const deleteFunction = (state: any) => {
    deleteMutation[0](state)
      .then(() => {
        refetch();
      })
      .catch(setErrorMessage);
  };
  const createFunction = (state: any) => {
    createMutation[0](state)
      .then(() => {
        refetch();
      })
      .catch(setErrorMessage);
  };

  return {
    functions: {
      changeFunction: changeFunction,
      createFunction: createFunction,
      deleteFunction: deleteFunction,
    },
    refetch,
    alert: { successAlert, setSuccessAlert },
    tableElements,
    error: { setErrorMessage, errorMessage },
  };
};

export default UseTableValues;
