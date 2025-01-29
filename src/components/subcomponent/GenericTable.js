import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import csvHelper from '../../helpers/csvHelper';

const GenericTable = ({ data = [] }) => {
    if (!data.length) return null;
    const headers = csvHelper.getCsvHeaders(data);
    const rows = csvHelper.getCleanCsvRows(data);
    return (
        <TableContainer component={Paper} data-testid="generic-table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers?.map(header => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row?.map(rowData => <TableCell key={rowData}>{rowData}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

GenericTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.string),
    ),
};

export default GenericTable;