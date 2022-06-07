import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import {
  Button
} from '@mui/material';

import Table from "../../components/Table/Table"
import { RowData } from "../../components/Table/Type"
import { Layout } from './layout';
import useStyles from '../styles';
import { HeaderData } from "./components/ResearchType"

export interface ResearchData {
  id: string;
  dateresearched: string;
  comments: string;
  createdby: string;
}

export default function Research() {
  const classes = useStyles();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const res = {
      "data": {
        "research": [
          {
            'id': '2343543234',
            'dateresearched': '01/01/2021',
            'comments': 'JD: Added departement, cohort',
            'createdby': 'John Doe'
          }
        ]
      }
    }

    setData(convertApiToProps(res.data.research));
  }, []);

  const saveRow = (item: any) => {

    if (item.personresearchid) {
      // temp code - start //
      let temp = data.map(dt => {
        if (dt.id == item.id) {
          return item
        }
        return dt;
      })
      setData(temp);
      // temp code - end //

      item = convertPropsToApi(item);
      console.log('update >>>>>>>>>');
      console.log(item);
      console.log('call update api >>>>>>>>>');
    } else {
      // temp code - start //
      let temp = data.map(dt => {
        if (!dt.id) {
          dt = item
          dt.id = (Math.random() + 1).toString(36).substring(7);
          return dt
        }
        return dt;
      })
      setData(temp);
      // temp code - end //

      item = convertPropsToApi(item);
      console.log('create >>>>>>>>>');
      console.log(item);
      console.log('call insert api >>>>>>>>>');
    }
  }
  const addRow = () => {
    let temp: any = [...data]
    temp.push({
      'dateresearched': { value1: '' },
      'comments': { value1: '' },
      'createdby': { value1: '' },
      'options': {}
    })
    setData(temp)
  }
  const deleteRow = (item: any) => {
    let temp = data.filter(dt => dt.id != item.id)
    setData(temp);

    item = convertPropsToApi(item);
    console.log('create >>>>>>>>>');
    console.log(item);
    console.log('call delete api >>>>>>>>>');
  }

  const convertApiToProps = (dt: ResearchData[]): RowData[] => {
    let res : any = []

    res = dt.map((item : ResearchData) => {
      return {
        'id': '53454',
        'dateresearched': { value1: item.dateresearched },
        'comments': { value1: item.comments },
        'createdby': { value1: item.createdby },
        'options': {}
      }
    })

    return res;
  }

  const convertPropsToApi = (dt: any): any => {
    let res : any = {
      personresearchid: dt.id,
      dateresearched: dt.dateresearched.value1,
      createdby: dt.createdby.value1,
      comments: dt.comments.value1
    }

    return res;
  }

  return (
    <>
      <Table headerData={HeaderData} tableData={data}
        saveRow={(data: any) => saveRow(data)}
        addRow={() => addRow()}
        deleteRow={(data: any) => deleteRow(data)} />
    </>
  )
}

Research.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout key="research" breadcrumb="Research">
      {page}
    </Layout>
  )
}
