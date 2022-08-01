import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  CAMPUS_QUERY,
  PERSON_TYPE_QUERY,
} from "../../../schemas/PersonHeaderSchemas";
import { useEffect, useState } from "react";

export const PersonHeaderController = () => {
  const router = useRouter();

  const onAddNewPerson = () => {
    // if (router.pathname.includes("[id]")) {
    //   router.pathname = router.pathname.replace("/[id]", "");
    // } else {
    //   // href += router.pathname + `/${id}`;
    // }

    router.pathname = "/persondataentry";
    router.query.state = "creating";
    delete router.query.id;
    router.push(router);
  };

  const [campusList, setCampusList] = useState<any[]>([]);
  const [personList, setPersonList] = useState<any[]>([]);

  const {
    data: CampusQueryData,
    error: CampusError,
    loading: CampusLoading,
  } = useQuery(CAMPUS_QUERY);

  const {
    data: PersonTypeData,
    error: PersonError,
    loading: PersonLoading,
  } = useQuery(PERSON_TYPE_QUERY);

  useEffect(() => {
    CampusQueryData?.campus &&
      setCampusList(
        CampusQueryData?.campus?.map((elem: any) => {
          return { label: elem.campus_name, id: elem.campus_id };
        })
      );
  }, [CampusQueryData]);

  useEffect(() => {
    PersonTypeData?.person_type &&
      setPersonList(
        PersonTypeData?.person_type?.map((elem: any) => {
          return { label: elem.category, id: elem.id };
        })
      );
  }, [PersonTypeData]);

  return {
    onAddNewPerson,
    dropbarLists: {
      campus: { list: campusList, error: CampusError, loading: CampusLoading },
      person: { list: personList, error: PersonError, loading: PersonLoading },
    },
  };
};
