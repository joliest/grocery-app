import * as React from 'react';
import GenericDrawer from '../subcomponent/GenericDrawer';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StandardTextField from '../form/inputs/StandardTextField';
import {useDispatch, useSelector} from 'react-redux';
import {addGrocery} from '../../actions/groceries';

export default function AddGroceryDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const handleNameChange = e => setName(e.target.value);
    const handleDescriptionChange = e => setDescription(e.target.value);
    const handleClose = () => setDrawerOpen(false);
    const handleOpen = () => {
        setDrawerOpen(true);
    };
    const handleSave = () => {
        dispatch(addGrocery({
            name, description,
        }));
        handleClose();
    }

    return (
        <GenericDrawer
            label="New Grocery"
            open={drawerOpen}
            setOpen={handleOpen}
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
                        onChange={handleDescriptionChange}
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
