import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOCATION_TYPE_QUERY } from "../schemas/CommonTableSchemas";

export const UseGetLocation = () => {
  const [dataArray, setDataArray] = useState<{ label: string; id: string }[]>(
    []
  );
  const { data } = useQuery(LOCATION_TYPE_QUERY);
  useEffect(() => {
    data?.location_type &&
      setDataArray(
        data.location_type.map((elem: any) => {
          return {
            id: elem.location_type_id,
            label: elem.location_type,
          };
        })
      );
  }, [data]);
  return { locationsArray: dataArray };
};
