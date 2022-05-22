import type { ReactElement } from 'react'
import Grid from '@mui/material/Grid';
import {
    Button
} from '@mui/material';

import Table from "../../components/Table/Table"
import { Layout } from './layout';
import useStyles from '../styles';


export default function Locations() {
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

Locations.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout breadcrumb="Locations">
            {page}
        </Layout>
    )
}
