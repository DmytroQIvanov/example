import { PersonDataEntrySideBar } from "../../components/SideBars/PersonDataEntrySideBar";
import { Index } from "../../components/Headers/PersonDataEntryHeader/PersonDataEntryHeader";
import BreadCrumb from "../../components/BreadCrumb";
import useStyles from "../styles";

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
      <PersonDataEntrySideBar />
      <div className={classes.content}>
        <Index />
        <BreadCrumb breadcrumbs={["Utilities", breadcrumb]} />
        <main>{children}</main>
      </div>
    </div>
  );
}
