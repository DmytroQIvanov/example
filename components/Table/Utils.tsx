import { HeaderData } from './Type';

export const getType: number = (key: string) => {
  return HeaderData.find((data) => data.id === key).type;
};

export const getOptions: (key: string) => { [p: string]: string[] } = (
  key: string
) => {
  return HeaderData.find((data) => data.id === key).options;
};

export const getVariant: (key: string) => any = (key: string) => {
  return HeaderData.find((data) => data.id === key).variant;
};

export const getEditDisabledValues: (key: string) => string[] = (
  key: string
) => {
  return HeaderData.find((data) => data.id === key).editDisabledValues;
};

export const getCtaType: string[] = (key: string) => {
  return HeaderData.find((data) => data.id === key).ctaType;
};

export const getCtaLabel: string[] = (key: string) => {
  return HeaderData.find((data) => data.id === key).ctaLabel;
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
    copy = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};
