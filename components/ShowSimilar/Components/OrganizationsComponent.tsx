import Button from "@mui/material/Button";

import Dropdown from "../../Dropdown";

const OrganizationsComponent = () => {
  const cityItems = [
    { name: "A", value: "A" },
    { name: "B", value: "B" },
    { name: "C", value: "C" },
    { name: "D", value: "D" },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center gap-5 px-3 xl:flex-row">
        <div className="flex w-full flex-col justify-center gap-3 md:flex-row xl:w-2/3 xl:justify-end">
          <div className="w-full md:w-1/4">
            <Dropdown
              includeEmptyValue
              title="City"
              headerTitle="Select a city"
              items={cityItems}
            />
          </div>
          <div className="w-full md:w-1/4">
            <Dropdown
              includeEmptyValue
              title="Organization Type"
              headerTitle="Select the Organization TYPE "
              items={cityItems}
            />
          </div>
          <div className="w-full md:w-1/4">
            <Dropdown
              includeEmptyValue
              title="Organization"
              headerTitle="Select the ORGANIZATION"
              items={cityItems}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4 xl:w-1/3 xl:flex-row xl:items-end">
          <div className="flex w-full flex-row items-end justify-center md:w-1/2 xl:justify-start">
            <Button
              className="w-full"
              sx={{ height: "40px" }}
              variant="contained"
              color={"green"}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsComponent;
