import type { ReactElement } from "react";

import { Layout } from "../layout";
import Table from "../../../components/Tables/OtherNamesTable/Index";

export default function Index() {
  return (
    <>
      <Table />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Other Names"}>{page}</Layout>;
};
