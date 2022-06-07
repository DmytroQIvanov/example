import type { ReactElement } from "react";

import { Layout } from "./layout";
import useStyles from "../styles";
import AddressReport from "../../components/AddressReport/AddressReport";
import BuildingSummary from "../../components/BuildingSummary/BuildingSummary";

export default function Index() {
  return <></>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout breadcrumb={''}>
      {page}
    </Layout>
  )
}
