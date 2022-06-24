import type { ReactElement } from "react";

import { Layout } from "./layout";

export default function Index() {
  return <></>;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb={""}>{page}</Layout>;
};
