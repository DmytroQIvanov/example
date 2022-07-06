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
