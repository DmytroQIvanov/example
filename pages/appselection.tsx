// @ts-nocheck
import { AppSelection } from "../components/AppSelection";
import useStyles from './styles';

const AppSelectionPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <AppSelection />
    </div>
  )
}

export default AppSelectionPage
