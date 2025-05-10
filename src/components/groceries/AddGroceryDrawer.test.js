import {fireEvent, render, screen} from '@testing-library/react';
import AddGroceryDrawer from './AddGroceryDrawer';

const setup = () => {
    const utils = render(<AddGroceryDrawer />);
    const getTriggerButton = () =>
        screen.getByRole('button', { name: 'New Grocery' });
    const getGroceryForm = () =>
        screen.queryByTestId('add-grocery-form');
    return {
        ...utils,
        getTriggerButton,
        getGroceryForm,
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
    });
})