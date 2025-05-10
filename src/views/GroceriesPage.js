import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getGroceries} from '../actions/groceries';
import Grid from '@mui/material/Grid2';
import {useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardTiles from '../components/subcomponent/CardTiles';
import AddGroceryDrawer from '../components/groceries/AddGroceryDrawer';

const GroceriesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groceries = useSelector((state) => state.groceries) || {};

    useEffect(() => {
        if (!groceries.isSuccess) {
            dispatch(getGroceries())
        }
    }, [groceries.isSuccess]);

    const handleGroceryClick = (id) => {
        const link = `/groceries/${id}`;
        navigate(link);
    }

    const cardTilesList = groceries.list?.map(grocery => ({
        id: grocery.id,
        name: grocery.name,
        body1: grocery?.store?.name,
        body2: grocery.description,
        onClick: handleGroceryClick,
    }));

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h2">Groceries</Typography>
            </Grid>
            <Grid size={12}>
                <AddGroceryDrawer />
            </Grid>
            <Grid size={12}>
                <CardTiles list={cardTilesList} />
            </Grid>
        </Grid>
    )
}

export default GroceriesPage;