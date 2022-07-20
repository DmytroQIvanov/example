interface IRowsPersonEmploymentTable {
  id: string;
  campus: {
    campus_id: number;
    campus_name: string;
  };
  // "area": {
  //   "area_id": 1545,
  //   "area": "Immunology & Microbiology",
  //   "campus_id": 6,
  //   "super_area": {
  //     "super_area_id": 704,
  //     "super_area": "School of Medicine",
  //     "campus_id": 6
  //   },
  //   "comments": null
  // },
  is_pi: boolean;
  superArea: string;
  area: string;
  turf: string;
  informationSource: string;
  supress: boolean;
  pi: boolean;
  comments: string;
  dfkv: string;
  dlkv: string;
  dmi: string;
  options?: string;
}
interface IColumnsPersonEmploymentTable {
  id: string;
  campus: string;
  superAreaArea: string;
  turf: string;
  informationSource: string;
  suppress: string;
  pi: string;
  comments: string;
  date_first_known_valid: string;
  date_last_known_valid: string;
  date_marked_invalid: string;
  options?: string;
}

export type { IRowsPersonEmploymentTable, IColumnsPersonEmploymentTable };
