import type { ReactElement } from 'react'
import Grid from '@mui/material/Grid';
import {
  Button
} from '@mui/material';

import Table from "../../components/Table/Table"
import { Layout } from './layout';
import useStyles from '../styles';

export default function Deductions() {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.actions}>
        <Button variant="contained" color="success">
          Location Data Entry
        </Button>
        <Button variant="contained" color="success">
          Add
        </Button>
      </Grid>
      <Table />
    </>
  )
}

Deductions.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout key="deductions" breadcrumb="Deductions">
      {page}
    </Layout>
  )
}
