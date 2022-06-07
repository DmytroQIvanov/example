import type { ReactElement } from 'react'
import Grid from '@mui/material/Grid';
import {
    Button
} from '@mui/material';

import Table from "../../components/Table/Table"
import { HeaderCellData, RowData } from "../../components/Table/Type"
import { Layout } from './layout';
import useStyles from '../styles';

interface TableProps {
    headerData?: HeaderCellData[];
    tableData?: RowData[];
    saveRow?: any;
    deleteRow?: any;
    addRow?: any;
}

export default function Locations() {
    const classes = useStyles();
    const data : TableProps = {};
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
            <Table headerData={data.headerData} />
        </>
    )
}

Locations.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout key="locations" breadcrumb="Locations">
            {page}
        </Layout>
    )
}
