import { gql } from "@apollo/client";

export const PERSON_DATA = gql`
  query person_query($pid: Int!) {
    person(where: { person_id: { _eq: $pid } }) {
      first_name
      middle_names
      last_name
      modified_by
      nick_name
      person_id
      last_employee_list_name
      last_employee_list_action
      last_employee_df
      last_df_list_name
      date_modified
      date_marked_invalid
      date_added
      cohort
      person_campuses {
        campus {
          campus_id
          campus_name
        }
        area {
          area_id
          area
          super_area {
            super_area_id
            super_area
          }
        }
        turfid
        is_pi
        date_last_known_valid
      }
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation create_person(
    $first_name: String!
    $middle_names: String
    $last_name: String!
    $nickname: String
    $suffix: String
    $employee_id: String
  ) {
    insert_person(
      objects: {
        first_name: $first_name
        middle_names: $middle_names
        last_name: $last_name
        nick_name: $nickname
        suffix: $suffix
        employee_id: $employee_id
      }
    ) {
      returning {
        first_name
        middle_names
        last_name
        nick_name
        suffix
        modified_by
        employee_id
        person_id
      }
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation update_person(
    $pid: Int!
    $first_name: String
    $middle_name: String
    $last_name: String
    $nick_name: String
    $suffix: String
    $employee_id: String
    $persontype: Int
    $date_modified: timestamp
  ) {
    update_person_by_pk(
      pk_columns: { person_id: $pid }
      _set: {
        first_name: $first_name
        middle_names: $middle_name
        last_name: $last_name
        nick_name: $nick_name
        suffix: $suffix
        employee_id: $employee_id
        person_type_id: $persontype
        date_modified: $date_modified
      }
    ) {
      person_id
      first_name
      middle_names
      last_name
      nick_name
      suffix
      employee_id
      person_type {
        id
        person_type
      }
      date_added
      date_modified
      modified_by
    }
  }
`;
