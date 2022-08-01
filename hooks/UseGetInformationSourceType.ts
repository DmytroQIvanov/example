import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { INFORMATION_SOURCE_QUERY } from "../schemas/CommonTableSchemas";

export const UseGetInformationSourceType = () => {
  const [informationSourceArray, setInformationSourceArray] = useState<any[]>(
    []
  );
  const { data: informationSourceData } = useQuery(INFORMATION_SOURCE_QUERY);
  useEffect(() => {
    informationSourceData?.information_source_type &&
      setInformationSourceArray(
        informationSourceData.information_source_type.map((elem: any) => {
          return {
            id: elem.information_source_type_id,
            label: elem.information_source_type,
          };
        })
      );
  }, [informationSourceData]);
  return { informationSourceArray };
};
