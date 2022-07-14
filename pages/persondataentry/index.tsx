import type { ReactElement } from "react";

import { Layout } from "./layout";
import useStyles from "../styles";
import AddressReport from "../../components/AddressReport/AddressReport";
import BuildingSummary from "../../components/BuildingSummary/BuildingSummary";
import { useRouter } from "next/router";
import AccountMain from "../../components/SummaryBar/AccountMain";

export default function Index() {
  const router = useRouter();
  if (router.query.state === "creating") {
    return <AccountMain />;
  }
  return <></>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={""}>{page}</Layout>;
};
