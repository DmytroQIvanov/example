import { gql } from "@apollo/client";

// state: "", //??????????? TODO
// google_formatted: "" TODO,
// formatted_address: "" TODO
// zip: "" TODO ,
// location_accuracy: "" TODO,

export const CREATE_HOME_ADDRESS = gql`
  mutation insert_person_home_address(
    $pid: Int!
    $street_number: String
    $street_name: String
    $apartment: String
    $city: String
    $zip_code: String
    $country: String
    $comments: String
    $source: Int!
    $normalized: String
    $state: String
  ) {
    insert_person_home_address_one(
      object: {
        person_id: $pid
        street_number: $street_number
        street_name: $street_name
        apartment: $apartment
        city: $city
        zip_code: $zip_code
        country: $country
        comments: $comments
        information_source_type_id: $source
        accuracy: "ROOFTOP"
        normalized_address: $normalized
        state: $state
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

export const INFORMATION_SOURCES_LIST = gql`
  query information_sources {
    information_source_type {
      information_source_type_id
      information_source_type
    }
  }
`;

export const HOME_ADDRESS_TABLE = gql`
  query home_address_query($pid: Int!) {
    person_home_address(where: { person_id: { _eq: $pid } }) {
      person_home_address_id
      street_number
      street_name
      apartment
      city
      zip_code
      state
      country
      accuracy
      comments
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
      information_source_type {
        information_source_type_id
        information_source_type
      }
    }
  }
`;

export const INVALIDATE_PERSON_HOME_ADDRESS = gql`
  mutation invalidate_person_home_address($id: Int!, $date: timestamp!) {
    update_person_home_address_by_pk(
      pk_columns: { person_home_address_id: $id }
      _set: { date_marked_invalid: $date }
    ) {
      date_marked_invalid
    }
  }
`;

export const VALIDATE_PERSON_HOME_ADDRESS = gql`
  mutation validate_person_home_address($id: Int!, $date: timestamp!) {
    update_person_home_address_by_pk(
      pk_columns: { person_home_address_id: $id }
      _set: { date_last_known_valid: $date }
    ) {
      date_last_known_valid
    }
  }
`;

export const DELETE_PERSON_HOME_TABLE = gql`
  mutation delete_person_home_address($id: Int!) {
    delete_person_home_address(
      where: { person_home_address_id: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;

export const CHANGE_DATE_LAST_KNOWN_VALID = gql`
  mutation validate_person_home_address($id: Int!, $date: timestamp!) {
    update_person_home_address_by_pk(
      pk_columns: { person_home_address_id: $id }
      _set: { date_last_known_valid: $date }
    ) {
      date_last_known_valid
    }
  }
`;

export const HOME_ADDRESS_DMI_NULL = gql`
  mutation update_person_home_address_dmi_null($id: Int) {
    update_person_home_address(
      where: { person_home_address_id: { _eq: $id } }
      _set: { date_marked_invalid: null }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_HOME_ADDRESS = gql`
  mutation update_person_home_address(
    $id: Int!
    $street_number: String
    $street_name: String
    $apartment: String
    $city: String
    $state: String
    $zip_code: String
    $country: String
    $comments: String
    $source: Int
    $date: timestamp
    $normalized: String
  ) {
    update_person_home_address_by_pk(
      pk_columns: { person_home_address_id: $id }
      _set: {
        street_number: $street_number
        street_name: $street_name
        apartment: $apartment
        city: $city
        state: $state
        country: $country
        comments: $comments
        information_source_type_id: $source
        date_last_known_valid: $date
        accuracy: "ROOFTOP"
        zip_code: $zip_code
        normalized_address: $normalized
      }
    ) {
      person_home_address_id
      street_number
      street_name
      state
      person_id
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
      comments
      country
      accuracy
    }
  }
`;
