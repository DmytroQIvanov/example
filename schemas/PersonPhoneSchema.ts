import { gql } from "@apollo/client";

export const PERSON_PHONE_DATA = gql`
query person_phone_query($pid: Int!) {
  person_phone(where: {person_id: {_eq: $pid}}) {
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