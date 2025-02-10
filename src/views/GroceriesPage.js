import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getGroceries} from '../actions/groceries';
import Grid from '@mui/material/Grid2';
import GenericTable from '../components/subcomponent/GenericTable';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';

const GROCERY_HEADER = ['Name', 'Description', 'Store'];

const renderName = (props) => (
    <Link to={`/groceries/${props.id}`}>
        {props.name}
    </Link>
);

const buildTable = (groceries) => {
    if (!groceries) return [];
    return [
        GROCERY_HEADER,
        ...groceries.map((grocery) => {
            return [
                renderName({
                    id: grocery?.id,
                    name: grocery?.name,
                }),
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
                <Typography variant="h2">Groceries</Typography>
            </Grid>
            <Grid size={12}>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/groceries/new"
                >
                    Add Grocery
                </Button>
            </Grid>
            <Grid size={12}>
                <GenericTable data={buildTable(groceries.list)} />
            </Grid>
        </Grid>
    )
}

export default GroceriesPage;