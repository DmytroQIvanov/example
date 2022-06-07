import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

import HomeAddressTable from "./components/HomeAddressTable/Table";
import PersonHomeAddressTable from "../../components/Tables/PersonHomeAddressTable/Index";
import { Layout } from "./layout";
import useStyles from "../styles";

export default function HomeAddress() {
  const classes = useStyles();

  return (
    <>
      <PersonHomeAddressTable />
    </>
  );
}

HomeAddress.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb="Home Address">{page}</Layout>;
};
