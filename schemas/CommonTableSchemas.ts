import { gql } from "@apollo/client";

export const INFORMATION_SOURCE_QUERY = gql`
  query information_source_query {
    information_source_type {
      information_source_type_id
      information_source_type
    }
  }
`;
