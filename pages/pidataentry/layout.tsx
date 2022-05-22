import Grid from '@mui/material/Grid';

import { PersonDataEntrySideBar } from "../../components/SideBars/PersonDataEntrySideBar";
import { PiDataEntryHeader } from "../../components/Headers/PiDataEntryHeader";
import Table from "../../components/Table/Table"
import BreadCrumb from "../../components/BreadCrumb"
import AccountMain from "../../components/SummaryBar/AccountMain"
import PiSummary from "../../components/PiSummary/PiSummary"
import useStyles from '../styles';

export function Layout({ children, breadcrumb }: {children: any, breadcrumb: string}) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <PersonDataEntrySideBar/>
      <div className={classes.content}>
        <PiDataEntryHeader />
        <Grid sx={{padding: '20px 100px'}}><PiSummary /></Grid>
        <BreadCrumb breadcrumbs={['PI Data Entry Form', breadcrumb]} />
        <main>{ children }</main>
      </div>
    </div>
  )
}
