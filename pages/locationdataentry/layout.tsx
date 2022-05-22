import { LocationDataEntrySideBar } from "../../components/SideBars/LocationDataEntrySideBar";
import { LocationDataEntryHeader } from "../../components/Headers/LocationDataEntryHeader";
import Table from "../../components/Table/Table"
import useStyles from '../styles';
import BreadCrumb from "../../components/BreadCrumb";
import PiSummary from "../../components/PiSummary/PiSummary";

export function Layout({ children, breadcrumb }: any) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <LocationDataEntrySideBar/>
      <div className={classes.content}>
        <LocationDataEntryHeader />
          <PiSummary/>
          <BreadCrumb breadcrumbs={['Person Data Entry', breadcrumb]} />
        <main>{ children }</main>
      </div>
    </div>
  )
}
