import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getGroceries} from '../actions/groceries';
import Grid from '@mui/material/Grid2';
import GenericTable from '../components/subcomponent/GenericTable';

const GROCERY_HEADER = ['Name', 'Description', 'Store'];
const buildTable = (groceries) => {
    if (!groceries) return [];
    return [
        GROCERY_HEADER,
        ...groceries.map((grocery) => {
            return [
                grocery?.name,
                grocery?.description,
                grocery?.store?.name,
            ];
        }),
    ]
};

const GroceriesPage = () => {
    const dispatch = useDispatch();
    const groceries = useSelector((state) => state.groceries);

    useEffect(() => {
        if (!groceries.isSuccess) {
            dispatch(getGroceries())
        }
    }, [groceries.isSuccess]);
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <h1>Groceries</h1>
            </Grid>
            <Grid size={12}>
                <GenericTable data={buildTable(groceries.list)} />
            </Grid>
        </Grid>
    )
}

export default GroceriesPage;