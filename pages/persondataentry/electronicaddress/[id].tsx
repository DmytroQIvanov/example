import type { ReactElement } from 'react'

import { Layout } from '../layout';
import Table from '../../../components/Tables/ElectronicAddressTable/Index'


export default function Index() {
  return (
    <>
      <Table/>
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout breadcrumb={'Electronic Addresses'}>
      {page}
    </Layout>
  )
}
