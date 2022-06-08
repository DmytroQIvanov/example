import type { ReactElement } from 'react'

import { Layout } from './layout';
import OrganizationResearchTable from '../../../components/Tables/OrganizationResearchTable/Index'


export default function Index() {
  return (
    <>
      <OrganizationResearchTable/>
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout breadcrumb={'Location Data Entry'}>
      {page}
    </Layout>
  )
}
