import type { ReactElement } from 'react'

import { Layout } from './layout';
import useStyles from '../styles';
import PersonInteractionTable from "../../components/PersonInteractionTable/PersonInteractionTable";


export default function Index() {
  return (
    <>
      <PersonInteractionTable/>

    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
