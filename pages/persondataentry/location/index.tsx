import type { ReactElement } from "react";

import { Layout } from "../../organizationdataentry/layout";
// @ts-ignore
import OrganizationLocationTable from "../../../components/Tables/OrganizationLocationTable";

export default function Index() {
  return (
    <>
      <OrganizationLocationTable />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Location Data Entry"}>{page}</Layout>;
};
