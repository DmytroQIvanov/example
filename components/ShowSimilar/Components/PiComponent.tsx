import Button from "@mui/material/Button";
import React, { useState } from "react";

import Dropdown from "../../Dropdown";

const PiComponent = () => {
  const cityItems = [
    { name: "A", value: "A" },
    { name: "B", value: "B" },
    { name: "C", value: "C" },
    { name: "D", value: "D" },
  ];

  const [city, setCity] = useState("");
  const [PI, setPI] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center gap-3 px-3 md:flex-row">
        <div className="w-full md:w-1/6">
          <Dropdown
            includeEmptyValue
            title="City"
            headerTitle="Select a city"
            items={cityItems}
            isRequired
            handleChangeFunction={(text: React.SetStateAction<string>) =>
              setCity(text)
            }
          />
        </div>
        <div className="w-full md:w-1/6">
          <Dropdown
            includeEmptyValue
            title="PI"
            headerTitle="Select a PI"
            items={cityItems}
            isRequired
            handleChangeFunction={(text: React.SetStateAction<string>) =>
              setPI(text)
            }
          />
        </div>
        <div className="flex w-full flex-row items-end md:w-1/6">
          <Button
            className="mb-1 w-full"
            variant="contained"
            disabled={!city || !PI}
            color={"green"}
            sx={{ height: "40px" }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PiComponent;
