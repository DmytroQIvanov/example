import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface ItemType {
  name: string;
  value: string;
}

function Dropdown(props: {
  includeEmptyValue: boolean;
  items: ItemType[];
  title: string;
  headerTitle: string;
  isRequired?: boolean;
  id?: string;
  setFieldValue?: Function;
  handleChangeFunction?: Function;
}) {
  const {
    includeEmptyValue = false,
    items = [],
    title = '',
    headerTitle = '',
    isRequired = false,
    id,
    setFieldValue,
    handleChangeFunction,
  } = props;

  const [value, setValue] = React.useState('');

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
    if (setFieldValue) setFieldValue(id, event.target.value);
    if (handleChangeFunction) handleChangeFunction(event.target.value);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="whitespace-nowrap pb-2 tracking-tight">
        {headerTitle}{' '}
        {isRequired && <span className="mt-3 text-center text-red-600">*</span>}
      </div>
      <div className="w-full">
        <FormControl size="small" className="w-full">
          <InputLabel id="demo-select-small">{title}</InputLabel>
          <Select
            labelId="demo-select-small"
            id={id}
            label={title}
            value={value}
            onChange={handleChange}
            className="bg-zinc-100"
          >
            {includeEmptyValue && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {items.map((item: ItemType) => (
              <MenuItem value={item.value} key={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default React.memo(Dropdown);
