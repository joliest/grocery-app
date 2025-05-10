import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const MIN_WIDTH = '20%';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    // makes sure that drawer is infront of AppBar
    zIndex: theme.zIndex.drawer + 2,
}));

const GenericDrawer = (props) => {
    const toggleDrawer =
        (isOpen) =>
            (event) => {
                if (event.type === 'keydown' &&
                    (event.key === 'Tab' || event.key === 'Shift')) {
                    return;
                }

                props.setOpen(isOpen);
            };

    return (
        <Box>
            <Button
                variant="outlined"
                onClick={toggleDrawer(true)}
            >
                {props.label}
            </Button>
            <StyledDrawer
                disableRestoreFocus
                anchor="right"
                open={props.open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        minWidth: MIN_WIDTH,
                        padding: 2,
                    },
                }}
            >
                <Box sx={{ my: 2 }}>
                    <Typography variant="h6">{props.label}</Typography>
                </Box>
                {props.children}
            </StyledDrawer>
        </Box>
    );
}

export default GenericDrawer;