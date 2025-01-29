import { render, screen } from '@testing-library/react';
import reactRouterDom from 'react-router-dom';
import GroceryPage from './GroceryPage';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-redux'),
    useParams: jest.fn(),
}));

const setup = () => {
    jest.spyOn(reactRouterDom, 'useParams').mockReturnValueOnce({ groceryId: 'grocery-id' });
    return render(<GroceryPage />);
}

describe('Groceries Page', () => {
    describe('on load', () => {
        it('renders h1 heading', () => {
            setup();
            expect(screen.getByText('Grocery: grocery-id')).toBeInTheDocument();
        });
    });
});

