export const useDropDownFunction = (data: any) => {
  const dropDownFunction = (inputName: string | undefined) => {
    if (!inputName) return;
    const result = inputName?.toString().split(".");
    if (result?.length === 2) {
      return data?.[result[0]]?.[result[1]];
    } else if (result?.length === 3) {
      return data?.[result[0]]?.[result[1]]?.[result[2]];
    } else {
      return data?.[inputName];
    }
  };

  return { dropDownFunction };
};
