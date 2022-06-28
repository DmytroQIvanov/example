import Grid from "@mui/material/Grid";

import useStyles from "../styles";
import Configuration from "../../components/Configuration/Configuration";
import BreadCrumb from "../../components/BreadCrumb";
import SideBar from "../components/SideBar";
import { BsFillPersonFill, BsPhoneFill } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdShare } from "react-icons/io";
import { FaMap, FaSuitcase } from "react-icons/fa";
import { OrganizationHeader } from "../../components/Headers/OrganizationHeader";
const arrowNavigation = [
  {
    // link: "/persondataentry/interactions",
    link: "/organizationdataentry/locationsdataentry",
    icon: <BsFillPersonFill className="react-icon" />,
    text: "Locations",
  },
  {
    link: "/persondataentry/electronicaddress",
    icon: <HiOutlineMailOpen className="react-icon" />,
    text: "Electronic Websites",
  },
  {
    link: "/persondataentry/affiliations",
    icon: <IoMdShare className="react-icon" />,
    text: "Research Notes",
  },
  {
    link: "/persondataentry/locations",
    icon: <FaMap className="react-icon" />,
    text: "Parents",
  },
  {
    link: "/persondataentry/phones",
    icon: <BsPhoneFill className="react-icon" />,
    text: "Children",
  },
  {
    link: "/organizationdataentry/childorgs",
    icon: <BsPhoneFill className="react-icon" />,
    text: "Child Orgs",
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
        {/*<LocationDataEntryHeader />*/}
        <OrganizationHeader />
        <Grid sx={{ padding: "20px 100px" }}>
          <Configuration />
        </Grid>
        <BreadCrumb
          breadcrumbs={["Organization Data Entry", breadcrumb]}
          icon={<FaSuitcase className="react-icon" />}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
