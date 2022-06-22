import type { ReactElement } from "react";

import { Layout } from "../layout";
// @ts-ignore
import Table from "../../../components/Tables/PersonInteractionTable/index";

export default function Index() {
  return (
    <>
      <Table />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Interactions"}>{page}</Layout>;
};
