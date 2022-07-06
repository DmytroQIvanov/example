import type { ReactElement } from "react";

import { Layout } from "../layout";
import Table from "../../../components/Tables/IDHistoryTable/Index";

export default function Index() {
  return (
    <>
      <Table />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Employee Id History"}>{page}</Layout>;
};
