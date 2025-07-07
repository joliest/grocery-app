import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux';
import {getGroceryById} from '../actions/groceries';
import Typography from '@mui/material/Typography';
import AddGroceryItemAutocomplete from '../components/groceries/AddGroceryItemAutocomplete';
import GroceryItemDataGrid from '../components/groceries/GroceryItemDataGrid';

const GroceryPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const selectedGrocery = useSelector((state) => state.groceries.selectedGrocery);
    useEffect(() => {
        if (String(selectedGrocery.id) !== params.groceryId) {
            dispatch(getGroceryById(params.groceryId));
        }
    }, [selectedGrocery.id]);

    return (
        <Grid container rowSpacing={5}>
            <Grid size={12}>
                <Typography variant="h2">{selectedGrocery.name}</Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ marginLeft: 1 }}
                >
                    {selectedGrocery.description}
                </Typography>
            </Grid>
            <Grid size={6}>
                <AddGroceryItemAutocomplete dispatch={dispatch} />
            </Grid>
            <Grid size={12}>
                <GroceryItemDataGrid list={selectedGrocery?.list} />
            </Grid>
        </Grid>
    )
}

export default GroceryPage;