import type { ReactElement } from "react";
import React from "react";

import PersonHomeAddressTable from "../../../components/Tables/PersonHomeAddressTable/Index";
import { Layout } from "../layout";

export default function Id() {
  return (
    <>
      <PersonHomeAddressTable />
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
