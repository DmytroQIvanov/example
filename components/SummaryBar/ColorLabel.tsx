import { Box } from '@mui/material';
import React from 'react';

const colorTypes = {
  '1': '#6A2AAA',
  '2': '#AA2A6A',
  '3': '#2A6AAA',
  '4': '#6C6D6F',
  '5': '#A9AA2A',
  '6': '#AA2B2B',
  '7': '#2AAA2A',
  '8': '#AA6A2A',
};

export function ColorLabel({ type }: {type: Number}) {
  return (
    <Box sx={{ marginRight: '5px' }}>
      label {type}
      <Box
        sx={{
          width: '70px',
          height: '40px',
          marginTop: '5px',
          backgroundColor: colorTypes[type],
          borderRadius: '5px',
        }}
      ></Box>
    </Box>
  );
}
