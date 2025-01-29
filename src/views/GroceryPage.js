import React from 'react';
import { useParams } from 'react-router-dom';

const GroceriesPage = () => {
    const params = useParams();
    return (
        <>
            <h1>Grocery: {params.groceryId}</h1>
        </>
    )
}

export default GroceriesPage;