import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { INFORMATION_SOURCE_QUERY } from "../schemas/CommonTableSchemas";
import { CAMPUS_QUERY } from "../schemas/PersonHeaderSchemas";

export const UseGetCampus = () => {
  const [campusArray, setCampusArray] = useState<
    { label: string; id: string }[]
  >([]);
  const { data } = useQuery(CAMPUS_QUERY);
  useEffect(() => {
    data?.campus &&
      setCampusArray(
        data.campus.map((elem: any) => {
          return {
            id: elem.campus_id,
            label: elem.campus_name,
          };
        })
      );
  }, [data]);
  return { campusArray };
};
