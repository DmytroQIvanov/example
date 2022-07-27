import { gql } from "@apollo/client";

export const INSERT_PERSON_RESEARCH = gql`
  mutation insert_person_research(
    $pid: Int!
    $comments: String = null
    $date: date!
    $created_by: String
  ) {
    insert_person_research_one(
      object: {
        person_id: $pid
        comments: $comments
        date_researched: $date
        created_by: $created_by
      }
    ) {
      person_research_id
      person_id
      date_researched
      created_by
      comments
    }
  }
`;
export const MUTATE_PERSON_RESEARCH = gql`
  mutation update_person_research($id: Int!, $comments: String) {
    update_person_research_by_pk(
      pk_columns: { person_research_id: $id }
      _set: { comments: $comments }
    ) {
      person_research_id
      person_id
      date_researched
      created_by
      comments
    }
  }
`;

export const PERSON_RESEARCH_QUERY = gql`
  query person_research_query($pid: Int!) {
    person_research(where: { person_id: { _eq: $pid } }) {
      person_research_id
      person_id
      date_researched
      comments
      created_by
    }
  }
`;

export const DELETE_PERSON_RESEARCH = gql`
  mutation delete_person_research($id: Int!) {
    delete_person_research_by_pk(person_research_id: $id) {
      person_research_id
    }
  }
`;
