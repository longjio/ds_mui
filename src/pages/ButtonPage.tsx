import React from 'react';
import { Button, Stack, Typography } from '@mui/material';

const ButtonPage = () => {
    return (
        <Stack spacing={3}>
            {/* Text Button */}
            <Typography variant="h6">Text Buttons</Typography>
            <Stack direction="row" spacing={1}>
                <Button>Primary</Button>
                <Button disabled>Disabled</Button>
                <Button href="#text-buttons">Link</Button>
            </Stack>

            {/* Outlined Button */}
            <Typography variant="h6">Outlined Buttons</Typography>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined">Primary</Button>
                <Button variant="outlined" disabled>Disabled</Button>
                <Button variant="outlined" href="#outlined-buttons">Link</Button>
            </Stack>

            {/* Contained Button */}
            <Typography variant="h6">Contained Buttons</Typography>
            <Stack direction="row" spacing={1}>
                <Button variant="contained">Primary</Button>
                <Button variant="contained" disabled>Disabled</Button>
                <Button variant="contained" href="#contained-buttons">Link</Button>
            </Stack>
        </Stack>
    );
};

export default ButtonPage;
