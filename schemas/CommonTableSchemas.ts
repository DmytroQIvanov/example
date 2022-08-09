import { gql } from "@apollo/client";

export const INFORMATION_SOURCE_QUERY = gql`
  query information_source_query {
    information_source_type {
      information_source_type_id
      information_source_type
    }
  }
`;

export const LOCATION_TYPE_QUERY = gql`
  query location_type_query {
    location_type {
      location_type_id
      location_type
    }
  }
`;
