import { gql } from "@apollo/client";

export const CAMPUS_QUERY = gql`
  query campus_query {
    campus {
      campus_id
      campus_name
    }
  }
`;

export const PERSON_TYPE_QUERY = gql`
  query person_type_query {
    person_type {
      id
      category
    }
  }
`;
