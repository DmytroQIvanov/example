import { HeaderCellData } from './Type';

export const getType = function(HeaderData: HeaderCellData[], key: string): number {
  if (Array.isArray(HeaderData) && key) {
    let res = HeaderData.find((data) => data.id === key);
    if (res) {
      return res.type;
    }
  }
  return 0;
};

export const getOptions = function (HeaderData: HeaderCellData[], key: string): any {
  let res = HeaderData.find((data) => data.id === key);
  if (Array.isArray(HeaderData) && res) {
    return res.options;
  }
  return {};
};

export const getVariant = function(HeaderData: HeaderCellData[], key: string): any {
  let res = HeaderData.find((data) => data.id === key);
  if (Array.isArray(HeaderData) && res) {
    return res.variant;
  }
  return {};
};

export const getEditDisabledValues = function(HeaderData: HeaderCellData[], key: string): string[] {
  let res = HeaderData.find((data) => data.id === key);
  if (Array.isArray(HeaderData) && res && res.editDisabledValues) {
    return res.editDisabledValues;
  }
  return [];
};

export const getCtaType = function(HeaderData: HeaderCellData[], key: string): string {
  let res = HeaderData.find((data) => data.id === key);
  if (Array.isArray(HeaderData) && res && res.ctaType) {
    return res.ctaType;
  }
  return '';
};

export const getCtaLabel = function(HeaderData: HeaderCellData[], key: string): string {
  let res = HeaderData.find((data) => data.id === key);
  if (Array.isArray(HeaderData) && res && res.ctaLabel) {
    return res.ctaLabel;
  }
  return '';
};

export const deepCopy: any = (obj: any) => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (obj == null || typeof obj !== 'object') return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    let copy : any = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepCopy(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};
