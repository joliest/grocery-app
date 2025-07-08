import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import AddGroceryDrawer from './AddGroceryDrawer';
import reactRedux from 'react-redux';
import {addGrocery} from '../../actions/groceries';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

const setup = (props = {}, state = {}) => {
    // mocks
    const mockDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);

    const initialStoreState = {
        list: [{
            id: 1,
            name: 'Store Name',
            description: 'Store Description',
        }],
        isSuccess: false,
        ...state,
    };
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(initialStoreState);

    // render
    const utils = render(<AddGroceryDrawer />);

    // useful functions
    const getTriggerButton = () => screen.getByRole('button', { name: 'New Grocery' });
    const getSaveButton = () => screen.getByRole('button', { name: 'Save' });
    const getGroceryForm = () => screen.queryByTestId('add-grocery-form');
    const getNameTextField = () => screen.getByLabelText('Name');
    const getDescriptionTextField = () => screen.getByLabelText('Description');
    const setNameTextFieldValue = value => fireEvent.change(getNameTextField(), { target: { value }});
    const setDescriptionTextFieldValue = value => fireEvent.change(getDescriptionTextField(), { target: { value }});
    return {
        ...utils,
        mockDispatch,
        getTriggerButton,
        getGroceryForm,
        getNameTextField,
        getDescriptionTextField,
        setNameTextFieldValue,
        setDescriptionTextFieldValue,
        getSaveButton,
    }
}

describe('<AddGroceryDrawer />', () => {
    let utils;
    describe('on load', () => {
        it('renders trigger button', () => {
            (utils = setup());
            expect(utils.getTriggerButton()).toBeInTheDocument();
        });
        it('does not render add grocery form', () => {
            (utils = setup());
            expect(utils.getGroceryForm()).not.toBeInTheDocument();
        });
    });
    describe('when trigger button is clicked', () => {
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
                utils.setDescriptionTextFieldValue('Desc test');
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
                        description: 'Desc test',
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