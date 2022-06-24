import Grid from "@mui/material/Grid";

import { PiDataEntryHeader } from "../../components/Headers/PiDataEntryHeader";
import BreadCrumb from "../../components/BreadCrumb";
import PiSummary from "../../components/PiSummary/PiSummary";
import useStyles from "../styles";
import SideBar from "../components/SideBar";
import { BsFillPersonFill, BsPhoneFill } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdShare } from "react-icons/io";
import { FaMap } from "react-icons/fa";
const arrowNavigation = [
  {
    link: "/pidataentry/locations",
    icon: <BsFillPersonFill className="react-icon" />,
    text: "Locations",
  },
  {
    link: "/pidataentry/websites",
    icon: <HiOutlineMailOpen className="react-icon" />,
    text: "Websites",
  },
  {
    link: "/pidataentry/members",
    icon: <IoMdShare className="react-icon" />,
    text: "Members",
  },
  {
    link: "/pidataentry/locations",
    icon: <FaMap className="react-icon" />,
    text: "Affiliations",
  },
  {
    link: "/pidataentry/researchcomments",
    icon: <BsPhoneFill className="react-icon" />,
    text: "Research Notes",
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
      <SideBar options={arrowNavigation} title={"PI Data Entry"} />

      <div className={classes.content}>
        <PiDataEntryHeader />
        <Grid sx={{ padding: "20px 100px" }}>
          <PiSummary />
        </Grid>
        <BreadCrumb breadcrumbs={["PI Data Entry", breadcrumb]} />
        <main>{children}</main>
      </div>
    </div>
  );
}
