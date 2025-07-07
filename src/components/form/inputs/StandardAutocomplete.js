import {Autocomplete} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import StandardTextField from './StandardTextField';

const DEFAULT_GET_OPTION_LABEL = (option) => option.name;
const DEFAULT_INPUT_VALUE = '';
const CHANGE_TYPE = {
    input: 'input',
    reset: 'reset',
}

const StandardAutocomplete = (props) => {
    const [inputValue, setInputValue] = useState(DEFAULT_INPUT_VALUE);
    const handleInputChange = (e, value, type) => {
        if (type === CHANGE_TYPE.input) {
            setInputValue(value);
            props.onInputChange?.(e, value);
        }
    }
    const displaySelectedValueToTextField = (value) => {
        const valueToDisplay = props.clearOnSelect
            ? DEFAULT_INPUT_VALUE
            : props.getOptionLabel(value)
        setInputValue(valueToDisplay)
    }
    const handleOnChange = (_, value) => {
        props.onChange?.(value);
        displaySelectedValueToTextField(value);
    }
    return (
        <Autocomplete
            {...props}
            id={props.id}
            data-testid={props.id}
            fullWidth
            options={inputValue.length ? props.options : []}
            getOptionLabel={props.getOptionLabel || DEFAULT_GET_OPTION_LABEL}
            onChange={handleOnChange}
            renderInput={(params) => (
                <StandardTextField
                    {...params}
                    id={`${props.id}-textfield`}
                    label={props.label}
                />
            )}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            disableClearable
        />
    );
};

StandardAutocomplete.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    clearOnSelect: PropTypes.bool,
}

StandardAutocomplete.defaultProps = {
    clearOnSelect: false,
}

export default StandardAutocomplete;