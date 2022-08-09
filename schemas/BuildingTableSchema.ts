import { gql } from "@apollo/client";

export const BUILDING_QUERY = gql`
  query location_query($id: Int!) {
    location(where: { building_id: { _eq: $id } }) {
      building_id
      room
      floor
      location_type {
        location_type_id
        location_type
      }
      location_id
      location_type_id
      date_created
    }
  }
`;

export const BUILDING_INSERT = gql`
  mutation insert_location(
    $id: Int!
    $floor: String
    $type: Int!
    $room: String
    $created_by: String
    $used_to_calculate_code: Boolean = false
  ) {
    insert_location_one(
      object: {
        building_id: $id
        floor: $floor
        location_type_id: $type
        room: $room
        used_to_calculate_code: $used_to_calculate_code
        created_by: $created_by
      }
    ) {
      building_id
      location_id
      floor
      location_type {
        location_type_id
        location_type
      }
      date_created
    }
  }
`;

export const BUILDING_DELETE = gql`
  mutation delete_location($id: Int!) {
    delete_location_by_pk(location_id: $id) {
      location_id
    }
  }
`;

export const BUILDING_UPDATE = gql`
  mutation update_location(
    $id: Int!
    $room: String
    $type: Int
    $floor: String
  ) {
    update_location_by_pk(
      pk_columns: { location_id: $id }
      _set: { room: $room, location_type_id: $type, floor: $floor }
    ) {
      building_id
      floor
      location_id
      date_created
      location_type {
        location_type_id
        location_type
      }
    }
  }
`;
