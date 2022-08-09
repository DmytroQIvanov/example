import Grid from "@mui/material/Grid";

import { LocationDataEntryHeader } from "../../components/Headers/LocationDataEntryHeader";
import useStyles from "../styles";
import BreadCrumb from "../../components/BreadCrumb";
import SideBar from "../components/SideBar";
import { BsPhoneFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import BuildingSummary from "../../components/BuildingSummary/BuildingSummary";
const arrowNavigation = [
  {
    link: "/locationsdataentry/building",
    icon: <BsPhoneFill className="react-icon" />,
    text: "Building",
  },
];

export function Layout({
  children,
  breadcrumb,
}: {
  children: any;
  breadcrumb: string;
}) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <SideBar options={arrowNavigation} title={"Organization Data Entry"} />
      <div className={classes.content}>
        <LocationDataEntryHeader />
        <Grid sx={{ padding: "20px 70px" }}>
          <BuildingSummary />
        </Grid>
        <BreadCrumb
          breadcrumbs={["Location Data Entry", breadcrumb]}
          icon={<FaSuitcase className="react-icon" />}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
