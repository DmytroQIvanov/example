import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

function InteractionInputPanel() {
  const [interactionType, setInteractionType] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [infoSource, setInfoSource] = React.useState("");
  const [date, setDate] = React.useState("2017-05-24");

  const handleInteractionType = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInteractionType(event.target.value);
  };

  const handleResponse = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setResponse(event.target.value);
  };

  const handleInfoSource = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInfoSource(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="pb-5 text-center text-xl text-gray-900">
        Add Interaction Record for Mariene Rose Salvador / 55929
      </div>
      <div className="flex w-full flex-row justify-center">
        <div className="flex w-full flex-col items-center gap-4 lg:w-3/5">
          <div className="flex w-full flex-col gap-4 md:flex-row ">
            <FormControl className="w-full md:w-1/2" size="small">
              <InputLabel className="rounded-lg" id="interaction-id">
                Interaction Type
              </InputLabel>
              <Select
                labelId="interaction-id"
                value={interactionType}
                label="Interaction Type"
                className="bg-zinc-100"
                onChange={handleInteractionType}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <div className="flex w-full flex-col gap-4 md:w-1/2 md:flex-row">
              <FormControl className="w-full md:w-1/2" size="small">
                <InputLabel id="response-id">Response</InputLabel>
                <Select
                  labelId="response-id"
                  value={response}
                  label="Response Type"
                  className="bg-zinc-100"
                  onChange={handleResponse}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormGroup className="flex w-full flex-row justify-center text-center md:w-1/2">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  sx={{ margin: 0 }}
                  label="Include Suppressed"
                  labelPlacement="start"
                />
              </FormGroup>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <TextField
              id="date"
              label="Interaction Date"
              type="date"
              defaultValue={date}
              size="small"
              className="w-full bg-zinc-100 md:w-1/2"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className="w-full md:w-1/2" size="small">
              <InputLabel id="infoSource-id">Information Source</InputLabel>
              <Select
                labelId="infoSource-id"
                value={infoSource}
                label="Information Source"
                className="bg-zinc-100"
                onChange={handleInfoSource}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-4 md:w-1/2 md:flex-row">
              <TextField
                size="small"
                className="w-full bg-zinc-100 md:w-1/2"
                label="Additional Info 1"
              />
              <TextField
                size="small"
                className="w-full bg-zinc-100 md:w-1/2"
                label="Additional Info 2"
              />
            </div>
            <TextField
              size="small"
              className="w-full bg-zinc-100 md:w-1/2"
              label="DB Only Notes"
            />
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-4 pr-0 md:w-1/2 md:flex-row md:pr-5">
              <TextField
                size="small"
                className="w-full bg-zinc-100 md:w-1/2"
                label="122-12-3444"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(InteractionInputPanel);
