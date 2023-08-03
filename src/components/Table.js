import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name,
    size,
    store,
    type,
    subtype,
    reference,
    date,
) {
    return { name, size, store, type, subtype, reference, date };
}

const rows = [
    createData('Gardenia', 82.00,'SMP Supermarket','Food','Bread','2023-22-02-smp-supermarket','02-23-2023'),
];

const BasicTable = () => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Store</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Subtype</TableCell>
                    <TableCell align="right">Reference</TableCell>
                    <TableCell align="right">Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.size}</TableCell>
                        <TableCell align="right">{row.store}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">{row.subtype}</TableCell>
                        <TableCell align="right">{row.reference}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)

export default BasicTable;