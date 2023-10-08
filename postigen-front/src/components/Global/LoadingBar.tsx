import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React from "react";

export function LinearIndeterminate(): React.ReactElement {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress/>
        </Box>
    );
}