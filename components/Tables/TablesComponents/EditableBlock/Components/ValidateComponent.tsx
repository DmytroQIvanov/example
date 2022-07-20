import { Box, Button } from "@mui/material";
import React from "react";
import { dateOptions } from "../index";
import { propsBlockWithState } from "../interfaces";

export const ValidateComponent = ({
  handleChange,
  changeValidateState,
}: propsBlockWithState) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        sx={{
          backgroundColor: "#134A90",
          color: "white",
          width: "95%",
          p: "3px",
          mt: "5px",
          "&:hover": {
            color: "white",
            backgroundColor: "#0e3e7a",
          },
        }}
        onClick={() => {
          const date = new Date();
          const pst = date.toLocaleString("en-US", dateOptions);
          handleChange("dlkv", pst);
          changeValidateState(false, true);
        }}
      >
        Validate
      </Button>
    </Box>
  );
};
