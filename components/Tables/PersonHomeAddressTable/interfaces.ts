`accuracy: "ROOFTOP"
coments: null
date_last_known_valid: "2022-07-12T10:17:22.909387"
date_marked_invalid: null
information_source_type: {__typename: 'information_source_type', information_source_type_id: 1, information_source_type: 'Lorem'}
person_home_address_id: 1
state: null
street_name: "Sloane Square"
street_number: ""
__typename: "person_home_address"`;
interface IRowsPersonEmploymentTable {
  person_home_address_id: string;

  street_number: string;
  street_name: string;
  source: string;
  full: string;

  apartment: string;
  zip: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  location_accuracy: string;
  information_source_type?: {
    information_source_type_id: number;
    information_source_type: string;
  };
  comments: string;
  date_first_known_valid: string;
  date_last_known_valid: string;
  date_marked_invalid: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  person_home_address_id: string;
  homeAddress: string;
  locationAccuracy: string;
  source: string;
  comments: string;
  dfkv: string;
  dlkv: string;
  marketInvalid: string;
  options: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
