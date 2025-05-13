import * as React from 'react';
import GenericDrawer from '../subcomponent/GenericDrawer';
import {useState} from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import StandardTextField from '../form/inputs/StandardTextField';
import {useDispatch} from 'react-redux';
import {addGrocery} from '../../actions/groceries';

export default function AddGroceryDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const handleNameChange = e => setName(e.target.value);
    const handleClose = () => setDrawerOpen(false);
    const handleSave = () => {
        dispatch(addGrocery({
            name,
        }));
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
                        onChange={handleNameChange}
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
                        disabled={!name}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </GenericDrawer>
    );
}
