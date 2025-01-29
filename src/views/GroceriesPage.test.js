import { render, screen } from '@testing-library/react';
import reactRedux from 'react-redux';
import GroceriesPage from './GroceriesPage';
import { getGroceries } from '../actions/groceries';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const setup = (props = {}, state = {}) => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    const mockDispatch = jest.fn();

    const initialGroceriesState = {
        list: [{
            id: 1,
            name: 'Grocery Name',
            description: 'Grocery Description',
            store: {
                name: 'Store Name',
            },
        }],
        ...state,
    };
    useSelectorMock.mockReturnValueOnce({ ...initialGroceriesState });
    useDispatchMock.mockReturnValueOnce(mockDispatch);

    const utils = render(<GroceriesPage {...props} />);
    const getColumnHeader = name => screen.getByRole('columnheader', { name });
    const getColumnCell = name => screen.getByRole('cell', { name });
    return {
        ...utils,
        mockDispatch,
        getColumnHeader,
        getColumnCell,
    };
}

describe('Groceries Page', () => {
    describe('on load', () => {
        it('renders h1 heading', () => {
            setup();
            expect(screen.getByText('Groceries')).toBeInTheDocument();
        });
        it('renders generic table', () => {
            setup();
            expect(screen.getByTestId('generic-table')).toBeInTheDocument();
        });
        it('dispatches get groceries', () => {
            // given
            const mockState = {
                isSuccess: false,
            };

            // when
            const { mockDispatch } = setup(null, mockState);

            // then
            expect(mockDispatch).toHaveBeenCalledWith(getGroceries());
        });
    });
    describe('when groceries is success', () => {
        it('does not dispatch get groceries', () => {
            // given
            const mockState = {
                isSuccess: true,
            };

            // when
            const { mockDispatch } = setup(null, mockState);

            // then
            expect(mockDispatch).not.toHaveBeenCalledWith(getGroceries());
        });
    });
    describe('table', () => {
        it('renders headings', () => {
            const utils = setup();
            expect(utils.getColumnHeader('Name')).toBeInTheDocument();
            expect(utils.getColumnHeader('Description')).toBeInTheDocument();
            expect(utils.getColumnHeader('Store')).toBeInTheDocument();
        });
        it('renders data', () => {
            const utils = setup();
            expect(utils.getColumnCell('Grocery Name')).toBeInTheDocument();
            expect(utils.getColumnCell('Grocery Description')).toBeInTheDocument();
            expect(utils.getColumnCell('Store Name')).toBeInTheDocument();
        });
    });
});

