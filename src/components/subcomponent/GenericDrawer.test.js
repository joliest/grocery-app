import {fireEvent, render, screen} from '@testing-library/react';
import GenericDrawer from './GenericDrawer';


const mockSetOpen = jest.fn();
const MockChildren = () => <div data-testid="mock-children" />;
const setup = (newProps = {}) => {
    const props = {
        open: false,
        setOpen: mockSetOpen,
        label: 'Trigger Button Label',
        ...newProps,
    }
    const getTriggerButton = () =>
        screen.getByRole('button', { name: props.label });
    const getChildren = () =>
        screen.queryByTestId('mock-children');
    const getHeading = () =>
        screen.getByRole('heading', { level: 6, name: props.label });
    const utils = render(
        <GenericDrawer {...props}>
            <MockChildren />
        </GenericDrawer>
    );
    return {
        ...utils,
        mockSetOpen,
        getTriggerButton,
        getHeading,
        getChildren,
    }
}

describe('<GenericDrawer />', () => {
    let utils;
    it('renders trigger button', () => {
        utils = setup()
        expect(utils.getTriggerButton()).toBeInTheDocument();
    });
    describe('when open is true', () => {
        beforeEach(() => {
            (utils = setup({ open: true }));
        });
        it('displays heading', () => {
            expect(utils.getHeading()).toBeInTheDocument();
        });
        it('renders children', () => {
            expect(utils.getChildren()).toBeInTheDocument();
        });
    });
    describe('when trigger button is clicked', () => {
        beforeEach(() => {
            (utils = setup());
            fireEvent.click(utils.getTriggerButton());
        });
        it('sets open to true', () => {
            expect(mockSetOpen).toHaveBeenCalledWith(true);
        });
    });
})