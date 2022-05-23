import Button from "@mui/material/Button";
import React, { useState } from "react";

import Dropdown from "../../Dropdown";

const Locations = () => {
  const cityItems = [
    { name: "A", value: "A" },
    { name: "B", value: "B" },
    { name: "C", value: "C" },
    { name: "D", value: "D" },
  ];

  const [city, setCity] = useState("");
  const [Building, setBuilding] = useState("");
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center gap-4 px-3 xl:flex-row">
        <div className="flex w-full flex-col justify-center gap-3 md:flex-row xl:w-2/3 xl:justify-end">
          <div className="w-full md:w-1/4">
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
          <div className="w-full md:w-1/4">
            <Dropdown
              includeEmptyValue
              title="Building"
              headerTitle="Select the Building"
              items={cityItems}
              isRequired
              handleChangeFunction={(text: React.SetStateAction<string>) =>
                setBuilding(text)
              }
            />
          </div>
          <div className="w-full md:w-1/4">
            <Dropdown
              includeEmptyValue
              title="Room"
              headerTitle="Select the Room"
              items={cityItems}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4 xl:w-1/3 xl:flex-row xl:items-end">
          <div className="flex w-full flex-row items-end justify-center md:w-1/2 xl:justify-start">
            <Button
              className="mb-1 w-full"
              variant="contained"
              color="green"
              sx={{ height: "40px" }}
              disabled={!city || !Building}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
