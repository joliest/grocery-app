import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
const GenericDataGrid = (props) => {
    return (
        <Box sx={{ height: 400, width: '100%' }} data-testid={props.id}>
            <DataGrid
                id={props.id}
                rows={props.rows}
                columns={props.columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

GenericDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default GenericDataGrid;
