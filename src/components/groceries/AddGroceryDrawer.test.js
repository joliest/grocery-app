import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import AddGroceryDrawer from './AddGroceryDrawer';
import reactRedux from 'react-redux';
import {addGrocery} from '../../actions/groceries';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

const setup = (props) => {
    // mocks
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    const mockDispatch = jest.fn();
    useDispatchMock.mockReturnValue(mockDispatch);

    // render
    const utils = render(<AddGroceryDrawer />);

    // useful functions
    const getTriggerButton = () => screen.getByRole('button', { name: 'New Grocery' });
    const getSaveButton = () => screen.getByRole('button', { name: 'Save' });
    const getGroceryForm = () => screen.queryByTestId('add-grocery-form');
    const getNameTextField = () => screen.getByLabelText('Name');
    const setNameTextFieldValue = value => fireEvent.change(getNameTextField(), { target: { value }});
    return {
        ...utils,
        mockDispatch,
        getTriggerButton,
        getGroceryForm,
        getNameTextField,
        setNameTextFieldValue,
        getSaveButton,
    }
}

describe('<AddGroceryDrawer />', () => {
    it('renders trigger button', () => {
        const { getTriggerButton } = setup();
        expect(getTriggerButton()).toBeInTheDocument();
    });
    it('does not render add grocery form', () => {
        const { getGroceryForm } = setup();
        expect(getGroceryForm()).not.toBeInTheDocument();
    });
    describe('when trigger button is clicked', () => {
        let utils;
        beforeEach(() => {
            (utils = setup());
            fireEvent.click(utils.getTriggerButton());
        });
        it('renders add grocery form', () => {
            expect(utils.getGroceryForm()).toBeInTheDocument();
        });
        it('renders disabled Save button', () => {
            expect(utils.getSaveButton()).toBeDisabled();
        });
        describe('filling out the form', () => {
            beforeEach(() => {
                utils.setNameTextFieldValue('Name test');
            });
            it('enables save button', () => {
                expect(utils.getSaveButton()).not.toBeDisabled();
            });
            describe('on save', () => {
                beforeEach(() => {
                    fireEvent.click(utils.getSaveButton());
                });
                it('dispatches save grocery action', () => {
                    const groceryAction = addGrocery({
                        name: 'Name test',
                    });
                    expect(utils.mockDispatch).toHaveBeenCalledWith(groceryAction);
                });
                it('closes the drawer', async () => {
                    await waitFor(() => {
                        expect(utils.getGroceryForm()).toBeNull();
                    });
                    expect(utils.getGroceryForm()).not.toBeInTheDocument();
                });
            });
        });
    });
})