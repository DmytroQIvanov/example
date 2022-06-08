import type { ReactElement } from 'react'

import { Layout } from '../layout';
import Table from '../../../components/Tables/PhoneTable/Index'


export default function Index() {
  return (
    <>
      <Table/>
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout breadcrumb={'Phones'}>
      {page}
    </Layout>
  )
}
