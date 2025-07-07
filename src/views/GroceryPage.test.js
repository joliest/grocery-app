import { render, screen } from '@testing-library/react';
import reactRouterDom from 'react-router-dom';
import GroceryPage from './GroceryPage';
import reactRedux from 'react-redux';
import {getGroceryById} from '../actions/groceries';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-redux'),
    useParams: jest.fn(),
}));

const setup = (props = {}, state = {}) => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    const useParamsMock = jest.spyOn(reactRouterDom, 'useParams');
    const mockDispatch = jest.fn();
    const initialGroceriesState = {
        id: 'id from redux',
        name: 'Grocery: grocery-id',
        description: 'grocery description',
    };
    useSelectorMock.mockReturnValueOnce({ ...initialGroceriesState });
    useDispatchMock.mockReturnValueOnce(mockDispatch);

    const useParamsReturnValue = { groceryId: 'id from redux' };
    useParamsMock.mockReturnValueOnce(props.urlParamValue || useParamsReturnValue);
    const utils =  render(<GroceryPage />);
    return {
        ...utils,
        mockDispatch,
    }
}

describe('Groceries Page', () => {
    describe('on load', () => {
        it('renders h2 heading', () => {
            setup();
            expect(screen.getByRole('heading', { level: 2, name: 'Grocery: grocery-id' }))
                .toBeInTheDocument();
        });
        it('renders description', () => {
            setup();
            expect(screen.getByRole('heading', { level: 6, name: 'grocery description' }))
                .toBeInTheDocument();
        });
        it('renders add grocery item dropdown', () => {
            setup();
            expect(screen.getByTestId('add-grocery-item-dropdown')).toBeInTheDocument();
        });
        it('renders add grocery item data grid', () => {
            setup();
            expect(screen.getByTestId('grocery-item-data-grid')).toBeInTheDocument();
        });
        describe('when selected grocery id is different with url param value', () => {
            const urlParamValue = { groceryId: 'id from url param' };
            it('dispatches get groceries by id action', () => {
                const utils = setup({ urlParamValue });
                expect(utils.mockDispatch)
                    .toHaveBeenCalledWith(getGroceryById(urlParamValue.groceryId));
            });
        });
        describe('when selected grocery id is similar with url param value', () => {
            const urlParamValue = { groceryId: 'id from redux' };
            it('does not dispatch get grocery by id action', () => {
                const utils = setup({ urlParamValue });
                expect(utils.mockDispatch).not.toHaveBeenCalled();
            });
        });
    });
});

