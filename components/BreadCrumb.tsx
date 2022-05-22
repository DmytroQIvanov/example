import { useState, useEffect } from 'react';

export default function BreadCrumb({ breadcrumbs }: { breadcrumbs: string[] }) {
  const [breadcrumb, setBreadcrumb] = useState('');

  useEffect(() => {
    setBreadcrumb(breadcrumbs.join(' / '))
  }, []);

  return (
    <div className="bread-crumb">
      { breadcrumb }
    </div>
  )
}