import {Autocomplete} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import StandardTextField from './StandardTextField';

const StandardAutocomplete = (props) => (
    <Autocomplete
        id={props.id}
        data-testid={props.id}
        fullWidth
        options={props.options}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => {
            props.onChange(value)
        }}
        renderInput={(params) => (
            <StandardTextField
                {...params}
                id={`${props.id}-textfield`}
                label={props.label}
            />
        )}
    />
);

StandardAutocomplete.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
}

export default StandardAutocomplete;