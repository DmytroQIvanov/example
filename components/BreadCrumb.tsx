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
  // const router = useRouter();
  // console.log(router.pathname);
  //
  // const [breadcrumbs,setBreadcrumbs] = useState<string[]>([]);
  //
  // useEffect(()=>{
  //   for(let i = 0; i < breadCrumbArray.length; i++){
  //     if(router.pathname.includes(breadCrumbArray[0].url)){
  //       setBreadcrumbs()
  //     }
  //   }
  // },[router.pathname])

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