import type { ReactElement } from "react";

import { Layout } from "../layout";

import OrganizationResearchTable from "../../../components/Tables/OrganizationLocationTable/Index";

export default function Index() {
  return (
    <>
      <OrganizationResearchTable />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Locations Data Entry"}>{page}</Layout>;
};
