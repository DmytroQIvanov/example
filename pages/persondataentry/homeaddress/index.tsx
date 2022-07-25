import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import PersonHomeAddressTable from "../../../components/Tables/PersonHomeAddressTable/Index";
import { Layout } from "../layout";
import useStyles from "../../styles";
import { useRouter } from "next/router";

export default function Index() {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  return <>{/*<PersonHomeAddressTable tableData={data} />*/}</>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout key="home-address" breadcrumb="Home Address">
      {page}
    </Layout>
  );
};
