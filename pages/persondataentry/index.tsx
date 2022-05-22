import type { ReactElement } from 'react'

import { Layout } from './layout';
import useStyles from '../styles';

export default function Index() {
  return (
    <>
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
