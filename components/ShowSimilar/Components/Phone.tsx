import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

const Phone = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center gap-3 px-3 md:flex-row">
        <div className="w-full md:w-1/6">
          <div className="flex w-full flex-col">
            <div className="whitespace-nowrap pb-2 tracking-tight">
              Enter part of a phone number
            </div>
            <div className="w-full">
              <TextField
                size="small"
                className="w-full bg-zinc-100"
                label="Phone Number"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-end md:w-1/6">
          <Button
            className=" green-button mb-1 w-full text-white"
            variant="contained"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Phone;
