import { PersonDataEntrySideBar } from "../../components/SideBars/PersonDataEntrySideBar";
import { PersonDataEntryHeader } from "../../components/Headers/PersonDataEntryHeader";
import Table from "../../components/Table/Table"
import useStyles from '../styles';

export function Layout({ children }: any) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <PersonDataEntrySideBar/>
      <div className={classes.content}>
        <PersonDataEntryHeader />
        <main>{ children }</main>
      </div>
    </div>
  )
}
