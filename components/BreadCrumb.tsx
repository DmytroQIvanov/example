import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BreadCrumb({
  breadcrumbs,
  icon,
}: {
  breadcrumbs: string[];
  icon?: any;
}) {
  const [breadcrumb, setBreadcrumb] = useState("");

  useEffect(() => {
    setBreadcrumb(breadcrumbs.join(" / "));
  }, [breadcrumbs]);

  return (
    <div className="bread-crumb">
      {breadcrumb}
      {icon && <div style={{ margin: "auto 10px" }}>{icon}</div>}
    </div>
  );
}
