import {fireEvent, screen, waitFor, within} from '@testing-library/react';

const changeInputValue = (autocomplete, value) => {
    const input = within(autocomplete).getByRole('combobox');
    autocomplete.focus();

    fireEvent.change(input, { target: { value } });
};

const selectFirstItem = (autocomplete) => {
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
};

const selectFromAutocomplete = (testId, value) => {
    const autocomplete = screen.getByTestId(testId);
    changeInputValue(autocomplete, value);
    selectFirstItem(autocomplete);
};

const asyncSelectFromAutocomplete = async (testId, value) => {
    const autocomplete = screen.getByTestId(testId);
    changeInputValue(autocomplete, value);
    await waitFor(() => {
        expect(screen.getByRole('option')).toBeInTheDocument();
    });
    selectFirstItem(autocomplete);
};

export default {
    selectFromAutocomplete,
    asyncSelectFromAutocomplete,
}