import * as React from 'react';
import GenericDrawer from '../subcomponent/GenericDrawer';
import {useState} from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import StandardTextField from '../form/inputs/StandardTextField';

export default function AddGroceryDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => setDrawerOpen(false);

    const handleSave = () => {
        handleClose();
    }

    return (
        <GenericDrawer
            label="New Grocery"
            open={drawerOpen}
            setOpen={setDrawerOpen}
        >
            <Grid data-testid="add-grocery-form" container spacing={2}>
                <Grid size={12}>
                    <StandardTextField
                        autoFocus
                        id="grocery-name"
                        label="Name"
                    />
                </Grid>
                <Grid size={12}>
                    <StandardTextField
                        id="description-name"
                        label="Description"
                    />
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid size={6}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </GenericDrawer>
    );
}
