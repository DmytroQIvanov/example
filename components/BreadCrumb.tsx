import { useState, useEffect } from 'react';
import {useRouter} from "next/router";

const breadCrumbArray =[

  {
    url:'',
    text:''
  },
    //FIRST PATH OF ROUTE
  {
    url:'',
    text:''
  }
]

export default function BreadCrumb({ breadcrumbs }: { breadcrumbs: string[] }) {

  const [breadcrumb, setBreadcrumb] = useState('');

  useEffect(() => {
    setBreadcrumb(breadcrumbs.join(' / '))
  }, [breadcrumbs]);

  return (
    <div className="bread-crumb">
      { breadcrumb }
    </div>
  )
}