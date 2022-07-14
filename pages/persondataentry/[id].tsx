import type { ReactElement } from "react";

import { Layout } from "./layout";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  if (router.query.state === "creating") {
    // return <AccountMain />;
  }
  return <></>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={""}>{page}</Layout>;
};
