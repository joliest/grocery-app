import * as React from 'react';
import GenericDrawer from '../subcomponent/GenericDrawer';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import StandardTextField from '../form/inputs/StandardTextField';
import {useDispatch, useSelector} from 'react-redux';
import {addGrocery} from '../../actions/groceries';
import {getStores} from '../../actions/stores';
import StandardAutocomplete from '../form/inputs/StandardAutocomplete';

export default function AddGroceryDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedStore, setSelectedStore] = useState(null);

    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores) || {};

    const options = stores?.list || [];

    const handleNameChange = e => setName(e.target.value);
    const handleDescriptionChange = e => setDescription(e.target.value);
    const handleClose = () => setDrawerOpen(false);
    const handleOpen = () => {
        setDrawerOpen(true);
    };
    const handleSave = () => {
        dispatch(addGrocery({
            name, description,
            storeId: selectedStore?.id,
        }));
        handleClose();
    }

    useEffect(() => {
        if (!stores.isSuccess) {
            dispatch(getStores())
        }
    }, [stores.isSuccess]);

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
                    <StandardAutocomplete
                        id="select-store-dropdown"
                        label="Store"
                        options={options}
                        onChange={(value) => setSelectedStore(value)}
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
