import React from "react";
import { FormControl, NativeSelect } from "@mui/material";
import { BootstrapInput } from "../../Search/Type";

const DropDown = ({
  list,
  title,
  handleClick,
  selectedValue,
}: {
  list: { id: number; label: string }[];
  title: string;
  handleClick: (id: number) => void;
  selectedValue: number;
}) => {
  return (
    <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
      <NativeSelect
        id="person-id"
        name="person"
        size="small"
        input={<BootstrapInput />}
      >
        <option className="default-option" value="">
          {title}
        </option>
        {list &&
          list.map((item) => {
            return (
              <option value={item.label} key={item.id}>
                {item.label}
              </option>
            );
          })}
      </NativeSelect>
    </FormControl>
  );
};

export default DropDown;
