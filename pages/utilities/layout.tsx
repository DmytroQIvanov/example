import { PersonDataEntrySideBar } from "../../components/SideBars/PersonDataEntrySideBar";
import { PersonDataEntryHeader } from "../../components/Headers/PersonDataEntryHeader";
import BreadCrumb from "../../components/BreadCrumb"
import Table from "../../components/Table/Table"
import useStyles from '../styles';

export function Layout({ children, breadcrumb }: {children: any, breadcrumb: string}) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <PersonDataEntrySideBar/>
      <div className={classes.content}>
        <PersonDataEntryHeader />
        <BreadCrumb breadcrumbs={['Utilities', breadcrumb]} />
        <main>{ children }</main>
      </div>
    </div>
  )
}
