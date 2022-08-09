export const deepStateFunction = (
  data: {
    prevState: any;
    value: any;
    name: string;
  }[]
) => {
  let object = data[0].prevState;
  data.forEach(({ prevState, value, name }) => {
    const result = name.toString().split(".");
    if (result.length === 2) {
      object = {
        ...object,
        [result[0]]: { ...object[result[0]], [result[1]]: value },
      };
    } else if (result.length === 3) {
      object = {
        ...object,
        [result[0]]: {
          ...object[result[0]],
          [result[1]]: {
            ...object[result[0]][result[1]],
            [result[2]]: value,
          },
        },
      };
    } else {
      object = { ...object, [name]: value };
    }
  });
  return object;
};
