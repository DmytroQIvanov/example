import { gql } from "@apollo/client";

export const GET_OTHER_NAMES = gql`
  query person_other_name_query($pid: Int!) {
    person_other_name(where: { person_id: { _eq: $pid } }) {
      person_other_name_id
      person_id
      name_source_type {
        name_source_type_id
        name_source_type
      }
      name_source_subtype {
        name_source_subtype_id
        name_source_subtype
      }
      first_name
      middle_name
      last_name
      nick_name
      suffix
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const CREATE_OTHER_NAME = gql`
  mutation insert_person_other_name(
    $pid: Int!
    $namesource: Int!
    $namesourcesubtype: Int = null
    $first_name: String
    $middle_name: String = null
    $last_name: String
    $nick_name: String = null
    $suffix: String = null
  ) {
    insert_person_other_name_one(
      object: {
        person_id: $pid
        name_source_type_id: $namesource
        name_source_subtype_id: $namesourcesubtype
        first_name: $first_name
        middle_name: $middle_name
        last_name: $last_name
        nick_name: $nick_name
        suffix: $suffix
      }
    ) {
      person_id
      person_other_name_id
      name_source_type {
        name_source_type_id
        name_source_type
      }
      name_source_subtype {
        name_source_subtype_id
        name_source_subtype
      }
      first_name
      middle_name
      last_name
      nick_name
      suffix
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const NAME_SOURCE_SUBTYPE_QUERY = gql`
  query name_source_subtype_query($id: Int!) {
    name_source_subtype(where: { name_source_type_id: { _eq: $id } }) {
      name_source_type {
        name_source_type_id
        name_source_type
      }
      name_source_subtype_id
      name_source_subtype
    }
  }
`;

export const NAME_SOURCE_TYPE_QUERY = gql`
  query name_source_type_query {
    name_source_type {
      name_source_type_id
      name_source_type
    }
  }
`;

export const CHANGE_OTHER_NAME = gql`
  mutation update_person_other_name(
    $id: Int!
    $namesource: Int
    $namesourcesubtype: Int
    $first_name: String
    $middle_name: String
    $last_name: String
    $nick_name: String
    $suffix: String
    $date: timestamp
  ) {
    update_person_other_name_by_pk(
      pk_columns: { person_other_name_id: $id }
      _set: {
        name_source_type_id: $namesource
        name_source_subtype_id: $namesourcesubtype
        first_name: $first_name
        middle_name: $middle_name
        last_name: $last_name
        nick_name: $nick_name
        suffix: $suffix
        date_last_known_valid: $date
      }
    ) {
      person_other_name_id
      name_source_type {
        name_source_type_id
        name_source_type
      }
      name_source_subtype {
        name_source_subtype_id
        name_source_subtype
      }
      first_name
      middle_name
      last_name
      nick_name
      suffix
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const VALIDATE_OTHER_NAME = gql`
  mutation validate_person_other_name($id: Int!, $date: timestamp!) {
    update_person_other_name_by_pk(
      pk_columns: { person_other_name_id: $id }
      _set: { date_last_known_valid: $date, date_marked_invalid: null }
    ) {
      person_other_name_id
      name_source_type {
        name_source_type_id
        name_source_type
      }
      name_source_subtype {
        name_source_subtype_id
        name_source_subtype
      }
      first_name
      middle_name
      last_name
      nick_name
      suffix
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const INVALIDATE_OTHER_NAME = gql`
  mutation invalidate_person_other_name($id: Int!, $date: timestamp!) {
    update_person_other_name_by_pk(
      pk_columns: { person_other_name_id: $id }
      _set: { date_marked_invalid: $date }
    ) {
      person_other_name_id
      name_source_type {
        name_source_type_id
        name_source_type
      }
      name_source_subtype {
        name_source_subtype_id
        name_source_subtype
      }
      first_name
      middle_name
      last_name
      nick_name
      suffix
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const DELETE_OTHER_NAMES = gql`
  mutation delete_person_other_name($id: Int!) {
    delete_person_other_name_by_pk(person_other_name_id: $id) {
      person_other_name_id
    }
  }
`;
