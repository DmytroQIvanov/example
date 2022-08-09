import { gql } from "@apollo/client";

export const BUILDING_QUERY = gql`
  query building_query($id: Int!) {
    building_by_pk(building_id: $id) {
      building_id
      campus {
        campus_id
        campus_name
      }
      building_acronym
      sector
      building_name
      building_street_number
      building_street_name
      building_city
      building_state
      building_zip
      comments
    }
  }
`;

export const BUILDING_MUTATION = gql`
  mutation update_building(
    $building_id: Int!
    $building_acronym: String
    $sector: String
    $building_name: String
    $building_street_number: String
    $building_zip: String
    $building_street_name: String
    $campus_id: Int
    $building_state: String
    $comments: String
    $building_city: String
  ) {
    update_building_by_pk(
      pk_columns: { building_id: $building_id }
      _set: {
        campus_id: $campus_id
        building_acronym: $building_acronym
        sector: $sector
        building_street_name: $building_street_name
        building_street_number: $building_street_number
        building_city: $building_city
        building_state: $building_state
        building_zip: $building_zip
        comments: $comments
        building_name: $building_name
      }
    ) {
      building_acronym
      building_city
      building_name
      building_state
      building_street_name
      building_street_number
      building_zip
      campus {
        campus_id
        campus_name
      }
      sector
      comments
    }
  }
`;
