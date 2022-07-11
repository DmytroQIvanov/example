import { gql } from "@apollo/client";

export const CREATE_HOME_ADDRESS = gql`
  mutation insert_person_home_address(
    $pid: Int!
    $street: String
    $streetname: String
    $apt: String
    $city: String
    $postal: String
    $country: String
    $comments: String
    $source: Int!
    $normalized: String
  ) {
    insert_person_home_address_one(
      object: {
        person_id: $pid
        street_number: $street
        street_name: $streetname
        apartment: $apt
        city: $city
        zip_code: $postal
        country: $country
        coments: $comments
        information_source_type_id: $source
        accuracy: "ROOFTOP"
        normalized_address: $normalized
      }
    ) {
      person_id
      street_number
      street_name
      apartment
      city
      zip_code
      country
      person_home_address_id
      created_by
      date_first_known_valid
      date_last_known_valid
      accuracy
    }
  }
`;
