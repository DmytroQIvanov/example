import type { ReactElement } from "react";

import { Layout } from "./layout";

// import Table from "../../components/Tables/ParentTable/Index";
import Table from "../../components/Tables/ParentOrgTable/Index";

export default function Index() {
  return (
    <>
      <Table />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Parent Orgs"}>{page}</Layout>;
};
