import type { ReactElement } from "react";

import { Layout } from "../layout";
import Table from "../../../components/Tables/OtherNamesTable/Index";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_OTHER_NAMES } from "../../../schemas/OtherNamesSchemas";

export default function Index() {
  const [data, setData] = useState<any[]>([]);

  const router = useRouter();
  const {
    data: otherNamesTable,
    error,
    loading,
    fetchMore,
    refetch,
  } = useQuery(GET_OTHER_NAMES, {
    variables: { pid: router.query.id  },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (otherNamesTable?.person_other_name)
      setData(() =>
        otherNamesTable?.person_other_name.map((elem: any) => {
          return {
            id: elem.person_other_name_id,
            ...elem,
            validateState: Boolean(elem.date_marked_invalid),
          };
        })
      );
  }, [otherNamesTable?.person_other_name]);

  console.log("OtherNames1", otherNamesTable);
  console.log("data", data);
  console.log("error", error);

  return (
    <>
      <Table tableData={data} loading={loading} refetch={refetch} />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Other Names"}>{page}</Layout>;
};
