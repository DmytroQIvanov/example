import Grid from '@mui/material/Grid';

import { PersonDataEntrySideBar } from "../../components/SideBars/PersonDataEntrySideBar";
import { OrganizationHeader } from "../../components/Headers/OrganizationHeader";
import Table from "../../components/Table/Table"
import useStyles from '../styles';
import Configuration from "../../components/Configuration/Configuration"
import BreadCrumb from "../../components/BreadCrumb"

export function Layout({ children, breadcrumb }: {children: any, breadcrumb: string}) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <PersonDataEntrySideBar/>
      <div className={classes.content}>
        <OrganizationHeader />
        <Grid sx={{padding: '20px 100px'}}><Configuration /></Grid>
        <BreadCrumb breadcrumbs={['Organiztion Data Entry', breadcrumb]} />
        <main>{ children }</main>
      </div>
    </div>
  )
}
