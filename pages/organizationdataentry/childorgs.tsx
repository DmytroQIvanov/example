import type { ReactElement } from "react";

import { Layout } from "./layout";

import Table from "../../components/Tables/ChildOrgTable/Index";

export default function Index() {
  return (
    <>
      <Table />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Child Orgs"}>{page}</Layout>;
};
