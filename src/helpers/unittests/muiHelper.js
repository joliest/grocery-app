import {fireEvent, screen, within} from '@testing-library/react';

const selectFromAutocomplete = (testId, value) => {
    const autocomplete = screen.getByTestId(testId);
    const input = within(autocomplete).getByRole('combobox');
    autocomplete.focus()

    fireEvent.change(input, { target: { value } })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })
};

export default {
    selectFromAutocomplete,
}