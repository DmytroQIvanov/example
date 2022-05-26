import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import { AiOutlineCaretDown, AiOutlineClose } from 'react-icons/ai';

function ModalSearchPanel() {
  const [allCampus, setAllCampus] = React.useState('');
  const [firstName, setFirstName] = React.useState('');

  const handleAllCampus = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAllCampus(event.target.value);
  };
  const handleFirstName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFirstName(event.target.value);
  };

  return (
    <div className="flex w-full flex-row justify-center">
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
        <FormControl className="w-full lg:w-32" size="small">
          <InputLabel id="all-campus-id">All Campus</InputLabel>
          <Select
            labelId="all-campus-id"
            value={allCampus}
            label="All Campus"
            className="bg-zinc-100"
            onChange={handleAllCampus}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className="w-full lg:w-1/3"
          variant="standard"
          size="small"
        >
          <InputLabel htmlFor="search-input">Search ...</InputLabel>
          <Input
            id="search-input"
            endAdornment={
              <InputAdornment position="end">
                <AiOutlineClose className="mr-2 hover:cursor-pointer hover:text-black" />
                <AiOutlineCaretDown className="hover:cursor-pointer hover:text-black" />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="relative mt-8 w-full lg:mt-0 lg:w-45">
          <FormGroup className="absolute -top-6 flex w-full flex-row text-center text-xs">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  style={{ marginLeft: '18px', padding: 0 }}
                />
              }
              sx={{
                margin: 0,
                '& .MuiFormControlLabel-label': { fontSize: '0.75rem' },
                '& .MuiFormControlLabel-labelPlacementStart': { gap: '20px' },
              }}
              label="Search Organizers Only"
              labelPlacement="start"
            />
          </FormGroup>
          <FormControl className="w-full" size="small">
            <InputLabel id="first-name-id">First Name</InputLabel>
            <Select
              labelId="first-name-id"
              value={firstName}
              label="First Name"
              className="bg-zinc-100"
              onChange={handleFirstName}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          {/* <FormGroup className="absolute left-32 -top-9">
            <Checkbox />
          </FormGroup>
          <span className="absolute left-0 -top-6 whitespace-nowrap text-xs text-slate-700">
            Search Organizers Only
          </span> */}
        </div>
        <Button
          className="w-full overflow-hidden text-ellipsis whitespace-nowrap bg-green-700 px-3 text-white lg:w-52"
          disableRipple
          variant="contained"
        >
          Person Data Entry
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ModalSearchPanel);
