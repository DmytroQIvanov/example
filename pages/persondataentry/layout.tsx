import { PersonDataEntryHeader } from "../../components/Headers/PersonDataEntryHeader";
import AccountMain from "../../components/SummaryBar/AccountMain";
import BreadCrumb from "../../components/BreadCrumb";
import useStyles from "../styles";
import SideBar from "../components/SideBar";
import { BsFillPersonFill, BsPhoneFill } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdShare } from "react-icons/io";
import { FaClipboardList, FaHome, FaMap, FaSuitcase } from "react-icons/fa";
import { useState } from "react";

export function Layout({
  children,
  breadcrumb,
}: {
  children: any;
  breadcrumb: string;
}) {
  const classes = useStyles();
  const arrowNavigation = [
    {
      link: "/persondataentry/interaction",
      icon: <BsFillPersonFill className="react-icon" />,
      text: "Person Interactions",
    },
    {
      link: "/persondataentry/electronicaddress",
      icon: <HiOutlineMailOpen className="react-icon" />,
      text: "Electronic Addresses",
    },
    {
      link: "/persondataentry/affiliations",
      icon: <IoMdShare className="react-icon" />,
      text: "Affiliations",
    },
    {
      link: "/persondataentry/locations",
      icon: <FaMap className="react-icon" />,
      text: "Locations",
    },
    {
      link: "/persondataentry/phones",
      icon: <BsPhoneFill className="react-icon" />,
      text: "Phones",
    },
    {
      link: "/persondataentry/othernames",
      icon: <FaClipboardList className="react-icon" />,
      text: "Other Names",
    },
    {
      link: "/persondataentry/homeaddress",
      icon: <FaHome className="react-icon" />,
      text: "Home Address",
    },
    {
      link: "/persondataentry/employment",
      icon: <FaSuitcase className="react-icon" />,
      text: "Employment",
    },
    {
      link: "/persondataentry/employeeidhistory",
      icon: <FaSuitcase className="react-icon" />,
      text: "Employment Id History",
    },
    {
      link: "/persondataentry/submissions",
      icon: <FaSuitcase className="react-icon" />,
      text: "Submissions",
    },
    {
      link: "/persondataentry/deductions",
      icon: <FaSuitcase className="react-icon" />,
      text: "Deductions",
    },
    {
      link: "/persondataentry/research",
      icon: <FaSuitcase className="react-icon" />,
      text: "Research",
    },
    {
      link: "/persondataentry/campus",
      icon: <FaSuitcase className="react-icon" />,
      text: "Campuses",
    },
  ];

  const [sideBarState, setSideBarState] = useState();
  return (
    <div className={classes.layout}>
      <SideBar options={arrowNavigation} title={"Person Data Entry"} />

      <div className={classes.content}>
        <PersonDataEntryHeader />
        <AccountMain />
        <BreadCrumb breadcrumbs={["Person Data Entry", breadcrumb]} />
        <main>{children}</main>
      </div>
    </div>
  );
}
