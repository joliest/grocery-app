import {TextField} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';

const StandardTextField = (props) => (
    <TextField
        {...props}
        id={props.id}
        fullWidth
        variant="standard"
        InputLabelProps={{ shrink: true }}
    />
);

StandardTextField.propTypes = {
    id: PropTypes.string.isRequired,
}

export default StandardTextField;