import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import HomeAddressTable from "./components/HomeAddressTable/Table";
import { Layout } from "./layout";
import useStyles from "../styles";

export default function HomeAddress() {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const res = {
      data: {
        person_home_address: [
          {
            id: "dfg345dsfs",
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
            datefirstknownvalid: "2018-01-09T00:00:00",
            datelastknownvalid: "2018-03-06T00:00:00",
            datemarkedinvalid: null,
          },
          {
            id: "2",
            streetnumber: "393",
            streetname: "HAMILTON STREET",
            apartment: "APT H1",
            city: "Agoura Hils",
            state: "CA",
            zip: "92627",
            location_accuracy: null,
            information_source_type: {
              informationsourcetypeid: 5,
              informationsourcetype: "U. List",
            },
            comments: null,
            datefirstknownvalid: "2018-01-09T00:00:00",
            datelastknownvalid: "2018-03-06T00:00:00",
            datemarkedinvalid: "2018-03-06T00:00:00",
          },
        ],
      },
    };

    setData(res.data.person_home_address);
  }, []);

  return (
    <>
      <HomeAddressTable tableData={data} />
    </>
  );
}

HomeAddress.getLayout = function getLayout(page: ReactElement) {
  return <Layout breadcrumb="Home Address">{page}</Layout>;
};
