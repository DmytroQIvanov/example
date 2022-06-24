import type { ReactElement } from "react";

import { Layout } from "../layout";
import Table from "../../../components/Tables/IDHistoryTable/Index";
import { useUser } from "@clerk/clerk-react";

export default function Index(props) {
  return (
    <>
      <Table />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={"Employee Id History"}>{page}</Layout>;
};
