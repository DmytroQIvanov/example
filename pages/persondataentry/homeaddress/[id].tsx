import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import PersonHomeAddressTable from "../../../components/Tables/PersonHomeAddressTable/Index";
import { Layout } from "../layout";
import useStyles from "../../styles";
import { useQuery } from "@apollo/client";
import { HOME_ADDRESS_TABLE } from "../../../schemas/HomeAddressSchemas";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function Id() {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);

  const router = useRouter();
  const {
    data: homeAddressTable,
    error,
    loading,
    fetchMore,
    refetch,
  } = useQuery(HOME_ADDRESS_TABLE, {
    variables: { pid: router.query.id },
    skip: !router.query.id,
  });

  useEffect(() => {
    if (homeAddressTable?.person_home_address)
      setData(() =>
        homeAddressTable?.person_home_address.map((elem: any) => {
          return {
            id: elem.person_home_address_id,
            ...elem,
            validateState: Boolean(elem.date_marked_invalid),
          };
        })
      );
  }, [homeAddressTable?.person_home_address]);

  console.log("homeAddressTable", homeAddressTable?.person_home_address);
  console.log("data", data);

  return (
    <>
      <PersonHomeAddressTable
        tableData={data}
        loading={loading}
        refetch={refetch}
      />
    </>
  );
}

Id.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout key="home-address" breadcrumb="Home Address">
      {page}
    </Layout>
  );
};
