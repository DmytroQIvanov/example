import { gql } from "@apollo/client";

export const LOCATION_BUILDING_QUERY = gql`
  query building_search($search: String!) {
    building_fuzzy_search(args: { search_text: $search }) {
      building_id
      campus {
        campus_id
        campus_name
      }
      building_name
      building_acronym
      sector
      building_street_number
      building_street_name
      building_city
      building_state
      building_zip
      comments
    }
  }
`;
