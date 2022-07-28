import { gql } from "@apollo/client";

//load person electronic data
export const PERSON_ELECTRONIC_DATA =  gql`
query person_electronic_query($pid: Int!) {
  person_electronic(where: {person_id: {_eq: $pid}}) {
    person_id
    person_electronic_id
    electronic_type {
      electronic_type_id
      electronic_type
    }
    information_source_type {
      information_source_type_id
      information_source_type
    }
    date_first_known_valid
    date_last_known_valid
    date_marked_do_not_include
    date_marked_invalid
  }
}
`;

//load electronic type drop down data query
export const ELECTRONIC_TYPE_QUERY = gql`
query electronic_type_query {
  electronic_type {
    electronic_type_id
    electronic_type
    acronym
  }
}
`;


//delete person electronic record
export const DELETE_PERSON_ELECTRONIC = gql`
mutation delete_person_electronic($id: Int!) {
  delete_person_electronic_by_pk(person_electronic_id: $id) {
    person_electronic_id
  }
}
`;


//insert person electronic record
export const INSERT_PERSON_ELECTRONIC = gql`
mutation insert_person_electronic($pid: Int!, $email: String!, $source: Int!, $electronictype: Int!) {
  insert_person_electronic_one(object: {person: {data: {person_id: $pid}}, electronic_address: $email, information_source_type_id: $source, electronic_type_id: $electronictype}) {
    person_id
    person_electronic_id
    electronic_address
    electronic_type {
      electronic_type_id
      electronic_type
    }
    information_source_type {
      information_source_type_id
      information_source_type
    }
    date_first_known_valid
    date_last_known_valid
    date_marked_invalid
  }
}

`;


//validate person electronic record
export const VALIDATE_PERSON_ELECTRONIC = gql`mutation validate_person_electronic($id: Int!, $date: timestamp) {
  update_person_electronic_by_pk(pk_columns: {person_electronic_id: $id}, 
  _set: {date_last_known_valid: $date, date_marked_invalid: null}) {
	person_id
    person_electronic_id
    electronic_address
    electronic_type {
      electronic_type_id
      electronic_type
    }
    information_source_type {
      information_source_type_id
      information_source_type
    }
    date_first_known_valid
    date_last_known_valid
    date_marked_invalid
  }
}
`;

//invalidate person electronic record
export const INVALIDATE_PERSON_ELECTRONIC = gql`
mutation invalidate_person_electronic($id: Int!, $date: timestamp) {
  update_person_electronic_by_pk(pk_columns: {person_electronic_id: $id}, _set: {, date_marked_invalid: $date}) {
	person_id
    person_electronic_id
    electronic_address
    electronic_type {
      electronic_type_id
      electronic_type
    }
    information_source_type {
      information_source_type_id
      information_source_type
    }
    date_first_known_valid
    date_last_known_valid
    date_marked_invalid
  }
}`;

export const UPDATE_PERSON_ELECTRONIC = gql`
mutation update_person_electronic($id: Int!, $email: String!, $electronictype: Int!, $source: Int!) {
  update_person_electronic_by_pk(pk_columns: {person_electronic_id: $id}, _set: {electronic_address: $email, 
    electronic_type_id: $electronictype, information_source_type_id: $source}) {
    person_id
    person_electronic_id
    electronic_address
    electronic_type {
      electronic_type_id
      electronic_type
    }
    information_source_type {
      information_source_type_id
      information_source_type
    }
    date_first_known_valid
    date_last_known_valid
    date_marked_invalid
  }
}
`;