export interface ConfigurationData {
  org_name: string;
  acronym: string;
  campus?: string;
  org_id?: number;
  org_type?: string;
  division?: string;
  university_name?: string;
  university_code?: string;
  prompt_location?: boolean;
}

export interface ConfTemplateData {
  org_name: string;
  acronym: string;
  campus?: string[];
  org_id?: number;
  org_type?: string[];
  division?: string[];
  university_name?: string;
  university_code?: string;
  prompt_location?: boolean;
}

export const ConfTemplate: ConfTemplateData = {
  org_name: '',
  acronym: '',
  campus: ['Riverside', 'value2'],
  org_id: 5134234,
  org_type: ['Hiring Unit', 'value3'],
  division: ['Social Sciences', 'value4'],
  university_name: '',
  university_code: '',
  prompt_location: false
}

const ConfigurationTest: ConfigurationData = {
  org_name: 'Agricultural Natural Resources - Sustainable Agriculture Research and Education Program',
  acronym: 'HDFCC-CANCERBRIO',
  campus: 'Riverside',
  org_id: 5134234,
  org_type: 'Hiring Unit',
  division: 'Social Sciences',
  university_name: 'CENTER FOR HAELTH TH PROMO & DESEASE',
  university_code: 'OGHMAP',
  prompt_location: false
};

export default ConfigurationTest;
