import * as React from 'react';
import PropTypes from 'prop-types';
import StandardAutocomplete from '../form/inputs/StandardAutocomplete';
import {selectGroceryItem} from '../../actions/groceries';
import useSearchProducts from '../../hooks/useSearchProducts';

const AddGroceryItemAutocomplete = (props) => {
    const productSearcher = useSearchProducts();
    const handleOnSearchGroceryItem = (_, value) => {
        productSearcher.searchProducts(value)
    };
    const handleGetOptionLabel = (option) => option.product?.name || '';
    const handleGetOptionKey = (option) => option.product?.id;
    const handleOnSelectGroceryItem = (val) => {
        if (val) {
            props.dispatch(selectGroceryItem(val));
        }
    }
    return (
        <StandardAutocomplete
            id="add-grocery-item-dropdown"
            label="Add Grocery Item"
            options={productSearcher.products}
            onChange={handleOnSelectGroceryItem}
            onInputChange={handleOnSearchGroceryItem}
            getOptionLabel={handleGetOptionLabel}
            getOptionKey={handleGetOptionKey}
            clearOnSelect
        />
    );
};

AddGroceryItemAutocomplete.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default AddGroceryItemAutocomplete;