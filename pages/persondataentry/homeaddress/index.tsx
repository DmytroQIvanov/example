import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";

// import HomeAddressTable from "./components/HomeAddressTable/Table";
import PersonHomeAddressTable from "../../../components/Tables/PersonHomeAddressTable/Index"
//import PersonHomeAddressTable from "../../../components/Tables/PersonHomeAddressTable";
import { Layout } from "../layout";
import useStyles from "../../styles";

export default function Index() {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const res = {
      data: {
        person_home_address: [
          {
            id: "3",
            streetnumber: "393",
            streetname: "HAMILTON STREET",
            apartment: "APT H1",
            city: "COSTA MESA",
            state: "CA",
            zip: "92627",
            location_accuracy: null,
            information_source_type: {
              informationsourcetypeid: 5,
              informationsourcetype: "U. List",
            },
            comments: null,
            datefirstknownvalid: "2012-01-09T00:00:00",
            datelastknownvalid: "2018-03-06T00:00:00",
            datemarkedinvalid: null,
          },
          {
            id: "2",
            streetnumber: "293",
            streetname: "Chicago STREET",
            apartment: "APT H1",
            city: "Agoura Hils",
            state: "CA",
            zip: "92627",
            location_accuracy: "Location Accuracy",
            information_source_type: {
              informationsourcetypeid: 5,
              informationsourcetype: "U. List2",
            },
            comments: "Lorem Chicago STREET",
            datefirstknownvalid: "2013-01-09T00:00:00",
            datelastknownvalid: "2012-03-06T00:00:00",
            datemarkedinvalid: "2018-03-06T00:00:00",
          },
          {
            id: "4",
            streetnumber: "3393",
            streetname: "Chica313go STREET",
            apartment: "APT H1",
            city: "Agoura Hils",
            state: "CA",
            zip: "92627",
            location_accuracy: null,
            information_source_type: {
              informationsourcetypeid: 5,
              informationsourcetype: "U. List3",
            },
            comments: "Lorem Tuchkova STREET",
            datefirstknownvalid: "2014-01-09T00:00:00",
            datelastknownvalid: "2014-03-06T00:00:00",
            datemarkedinvalid: "2013-03-06T00:00:00",
          },
        ],
      },
    };

    setData(res.data.person_home_address);
  }, []);

  return (
    <>
      <PersonHomeAddressTable tableData={data} />
    </>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout key="home-address" breadcrumb="Home Address">
      {page}
    </Layout>
  );
};
