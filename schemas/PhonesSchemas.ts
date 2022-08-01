import { gql } from "@apollo/client";

export const PERSON_PHONE_DATA = gql`
  query person_phone_query($pid: Int!) {
    person_phone(where: { person_id: { _eq: $pid } }) {
      person_phone_id
      person_id
      phone_number
      phone_type {
        phone_type_id
        phone_type
      }
      information_source_type {
        information_source_type_id
        information_source_type
      }
      date_marked_do_not_call
      comments
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const DELETE_PERSON_PHONE = gql`
  mutation delete_person_phone($id: Int!) {
    delete_person_phone_by_pk(person_phone_id: $id) {
      person_phone_id
    }
  }
`;

export const INSERT_PERSON_PHONE = gql`
  mutation insert_person_phone(
    $number: String!
    $type: Int!
    $source: Int!
    $dnc: timestamp = null
    $comments: String
    $pid: Int!
  ) {
    insert_person_phone_one(
      object: {
        phone_number: $number
        phone_type_id: $type
        information_source_type_id: $source
        date_marked_do_not_call: $dnc
        comments: $comments
        person_id: $pid
      }
    ) {
      phone_number
      phone_type {
        phone_type_id
        phone_type
      }
      information_source_type {
        information_source_type_id
        information_source_type
      }
      date_marked_do_not_call
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const UPDATE_PERSON_PHONE = gql`
  mutation update_person_phone(
    $id: Int!
    $number: String
    $type: Int
    $source: Int
    $dnc: timestamp
    $comments: String
  ) {
    update_person_phone_by_pk(
      pk_columns: { person_phone_id: $id }
      _set: {
        phone_number: $number
        phone_type_id: $type
        information_source_type_id: $source
        date_marked_do_not_call: $dnc
        comments: $comments
      }
    ) {
      phone_number
      phone_type {
        phone_type_id
        phone_type
      }
      information_source_type {
        information_source_type_id
        information_source_type
      }
      date_marked_do_not_call
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const VALIDATE_PERSON_PHONE = gql`
  mutation validate_person_phone($id: Int!, $date: timestamp!) {
    update_person_phone_by_pk(
      pk_columns: { person_phone_id: $id }
      _set: { date_last_known_valid: $date, date_marked_invalid: null }
    ) {
      person_phone_id
      phone_number
      #      phone_type {
      #        phone_type_id
      #        phone_type
      #      }
      information_source_type {
        information_source_type_id
        information_source_type
      }
      date_marked_do_not_call
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const INVALIDATE_PERSON_PHONE = gql`
  mutation invalidate_person_phone($id: Int!, $date: timestamp!) {
    update_person_phone_by_pk(
      pk_columns: { person_phone_id: $id }
      _set: { date_marked_invalid: $date }
    ) {
      person_phone_id
      phone_number
      #      phone_type {
      #        phone_type_id
      #        phone_type
      #      }
      information_source_type {
        information_source_type_id
        information_source_type
      }
      date_marked_do_not_call
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const PHONE_TYPE_DATA = gql`
  query phone_type_query {
    phone_type {
      phone_type_id
      phone_type
      phone_type_acronym
    }
  }
`;

export const DNC = gql`
  mutation dnc($id: Int!, $date: timestamp!) {
    update_person_phone_by_pk(
      pk_columns: { person_phone_id: $id }
      _set: { date_marked_do_not_call: $date }
    ) {
      date_marked_do_not_call
    }
  }
`;

export const REMOVE_DNC = gql`
  mutation remove_dnc($id: Int!) {
    update_person_phone_by_pk(
      pk_columns: { person_phone_id: $id }
      _set: { date_marked_do_not_call: null }
    ) {
      date_marked_do_not_call
    }
  }
`;
