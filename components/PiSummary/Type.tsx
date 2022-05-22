export interface PiSummaryData {
  campus?: string;
  pi?: string;
  person_id?: string;
  other_compuses?: string;
  super_area?: string;
  area?: string;
  prompt_location?: boolean;
}

const PiSummaryDataTest: PiSummaryData = {
  campus: 'LA',
  pi: 'Last, First',
  person_id: '55124',
  other_compuses: 'SB, BK, SF',
  super_area: 'CBS.blochemistry, Molecular, Cellular, and Development Biology',
  area: 'Biochemistry, Molecular, Cellular, and Development Biology GG'
};

export default PiSummaryDataTest;
