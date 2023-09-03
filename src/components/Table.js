import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BasicTable = () => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        const getProducts = async () => {
            let fetchedProducts = [];
            try {
                fetchedProducts = await axios.get('http://localhost:8080/v1/products')
            } catch (e) {
                console.log(e)
            }
            return fetchedProducts;
        }
        if (!products) {
            getProducts().then((fetchedProducts = {}) => {
                setProducts(fetchedProducts.data);
            });
        }
    }, [products]);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Store</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Sub Category</TableCell>
                        <TableCell align="right">Reference</TableCell>
                        <TableCell align="right">Date Purchased</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products?.map((product) => (
                        <TableRow
                            key={product.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{product.name}</TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                            <TableCell align="right">{product.store}</TableCell>
                            <TableCell align="right">{product.category}</TableCell>
                            <TableCell align="right">{product.subCategory}</TableCell>
                            <TableCell align="right">{product.link}</TableCell>
                            <TableCell align="right">{product.datePurchased}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;