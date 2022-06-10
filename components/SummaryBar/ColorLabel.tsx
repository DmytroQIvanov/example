import { Box } from '@mui/material';
import React from 'react';

const colorTypes = [
    '#6A2AAA',
    '#AA2A6A',
    '#2A6AAA',
    '#6C6D6F',
    '#A9AA2A',
    '#AA2B2B',
    '#2AAA2A',
    '#AA6A2A',
];

export function ColorLabel({ type, text }: { type: number; text?: string }) {
    return (
        <Box sx={{ marginRight: '5px',fontSize:'0.75rem' }}>
            {text}
            <Box
                sx={{
                    width: '70px',
                    height: '40px',
                    marginTop: '5px',
                    backgroundColor: colorTypes[type],
                    borderRadius: '5px',
                }}
            />
        </Box>
    );
}
