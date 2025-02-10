import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import {Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {getGroceryById} from '../actions/groceries';
import Typography from '@mui/material/Typography';

const GroceriesPage = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const selectedGrocery = useSelector((state) => state.groceries.selectedGrocery);
    useEffect(() => {
        if (String(selectedGrocery.id) !== params.groceryId) {
            dispatch(getGroceryById(params.groceryId));
        }
    }, [selectedGrocery.id]);
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/groceries"
                >
                    Back
                </Button>
            </Grid>
            <Grid size={12}>
                <Typography variant="h2">{selectedGrocery.name}</Typography>
                <Typography variant="subtitle1">{selectedGrocery.description}</Typography>
            </Grid>
        </Grid>
    )
}

export default GroceriesPage;