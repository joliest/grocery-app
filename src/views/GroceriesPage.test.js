import { render, screen } from '@testing-library/react';
import reactRedux from 'react-redux';
import reactRouterDom, {BrowserRouter} from 'react-router-dom';
import GroceriesPage from './GroceriesPage';
import { getGroceries } from '../actions/groceries';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const TestableGroceryPage = (props) => (
    <BrowserRouter>
        <GroceriesPage {...props} />
    </BrowserRouter>
);

const setup = (props = {}, state = {}) => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    const useNavigateMock = jest.spyOn(reactRouterDom, 'useNavigate');
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    const initialGroceriesState = {
        list: [{
            id: 1,
            name: 'Grocery Name',
            description: 'Grocery Description',
            store: {
                name: 'Store Name',
            },
        }],
        isSuccess: false,
        ...state,
    };
    useSelectorMock.mockReturnValueOnce({ ...initialGroceriesState });
    useDispatchMock.mockReturnValueOnce(mockDispatch);
    useNavigateMock.mockReturnValueOnce(mockNavigate);

    const utils = render(<TestableGroceryPage {...props} />);
    const getCardTitle = name => screen.getByRole('heading', { level: 5, name });
    const getAddButton = () => screen.getByRole('link', { name: 'Add Grocery'});
    return {
        ...utils,
        mockDispatch,
        mockNavigate,
        getCardTitle,
        getAddButton,
    };
}

describe('Groceries Page', () => {
    describe('on load', () => {
        it('renders h1 heading', () => {
            setup();
            expect(screen.getByText('Groceries')).toBeInTheDocument();
        });
        it('renders card titles', () => {
            setup();
            expect(screen.getByTestId('card-titles')).toBeInTheDocument();
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
    describe('add grocery button', () => {
        it('renders', () => {
            const utils = setup();
            expect(utils.getAddButton()).toBeInTheDocument();
        });
        it('should href to grocery/new', () => {
            const utils = setup();
            expect(utils.getAddButton()).toHaveAttribute('href', '/groceries/new');
        });
    });
    describe('card title', () => {
        it('renders tile title', () => {
            const utils = setup();
            expect(utils.getCardTitle('Grocery Name')).toBeInTheDocument();
        });
        it('renders description', () => {
            setup();
            expect(screen.getByText('Grocery Description')).toBeInTheDocument();
        });
        it('renders store', () => {
            setup();
            expect(screen.getByText('Store Name')).toBeInTheDocument();
        });
    });
});

