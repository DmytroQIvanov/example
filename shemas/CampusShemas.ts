import { gql } from "@apollo/client";

export const PERSON_CAMPUS_QUERY = gql`
  query person_campus_query($pid: Int!) {
    person_campus(where: { person_id: { _eq: $pid } }) {
      person_id
      person_campus_id
      campus {
        campus_id
        campus_name
      }
      area {
        area_id
        area
        campus_id
        super_area {
          super_area_id
          super_area
          campus_id
        }
        comments
      }
      turfid
      information_source_type {
        information_source_type_id
        information_source_type
      }
      supress
      is_pi
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;

export const UPDATE_PERSON_CAMPUS = gql`
  mutation update_person_campus(
    $id: Int!
    $campus: Int
    $area: Int = null
    $turf: Int = null
    $source: Int!
    $supress: Boolean
    $pi: Boolean = false
    $comments: String = null
    $date: timestamp
  ) {
    update_person_campus_by_pk(
      pk_columns: { person_campus_id: $id }
      _set: {
        campus_id: $campus
        area_id: $area
        turfid: $turf
        information_source_id: $source
        supress: $supress
        is_pi: $pi
        summary: $comments
        date_last_known_valid: $date
      }
    ) {
      person_campus_id
      person_id
      summary
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
      information_source_type {
        information_source_type_id
        information_source_type
      }
      supress
      is_pi
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
    }
  }
`;
export const INSERT_PERSON_CAMPUS = gql`
  mutation insert_person_campus(
    $pid: Int!
    $campus: Int!
    $area: Int = null
    $turf: Int = null
    $source: Int!
    $suppress: Boolean = false
    $pi: Boolean = false
    $comments: String = null
  ) {
    insert_person_campus_one(
      object: {
        campus_id: $campus
        area_id: $area
        turfid: $turf
        information_source_id: $source
        supress: $suppress
        is_pi: $pi
        summary: $comments
        person_id: $pid
      }
    ) {
      person_campus_id
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
      information_source_type {
        information_source_type_id
        information_source_type
      }
      is_pi
      summary
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
      person_id
    }
  }
`;

export const CAMPUS_LIST_QUERY = gql`
  query campus_query {
    campus {
      campus_id
      campus_name
    }
  }
`;

export const SUPER_AREA_QUERY = gql`
  query super_area_query($campus: Int!) {
    super_area(where: { campus_id: { _eq: $campus } }) {
      super_area_id
      super_area
      campus_id
      areas {
        area_id
        area
        campus_id
      }
    }
  }
`;

export const AREA_QUERY = gql`
  query area_query($campus: Int!, $superarea: Int!) {
    area(
      where: { super_area_id: { _eq: $superarea }, campus_id: { _eq: $campus } }
    ) {
      area_id
      area
      super_area_id
      campus_id
    }
  }
`;

export const DELETE_CAMPUS_TABLE = gql`
  mutation delete_person_campus($id: Int!) {
    delete_person_campus_by_pk(person_campus_id: $id) {
      person_campus_id
    }
  }
`;

export const VALIDATE_CAMPUS_TABLE = gql`
  mutation validate_person_campus($id: Int!, $date: timestamp!) {
    update_person_campus_by_pk(
      pk_columns: { person_campus_id: $id }
      _set: { date_last_known_valid: $date, date_marked_invalid: null }
    ) {
      person_campus_id
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
      information_source_type {
        information_source_type_id
        information_source_type
      }
      is_pi
      summary
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
      person_id
    }
  }
`;

export const INVALIDATE_CAMPUS_TABLE = gql`
  mutation invalidate_person_campus($id: Int!, $date: timestamp!) {
    update_person_campus_by_pk(
      pk_columns: { person_campus_id: $id }
      _set: { date_marked_invalid: $date }
    ) {
      person_campus_id
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
      information_source_type {
        information_source_type_id
        information_source_type
      }
      is_pi
      summary
      date_first_known_valid
      date_last_known_valid
      date_marked_invalid
      person_id
    }
  }
`;
