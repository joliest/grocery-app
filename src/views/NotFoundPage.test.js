import { render, screen } from '@testing-library/react';
import{BrowserRouter} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

// Fix for: Uncaught TypeError: Cannot destructure property 'basename' of 'React2.useContext(...)'
const TestableNotFoundPage = () => (
    <BrowserRouter>
        <NotFoundPage />
    </BrowserRouter>
);

const setup = () => {
    return render(<TestableNotFoundPage />);
}



describe('Not Found Page', () => {
    it('renders 404 not found', () => {
        setup();
        expect(screen.getByText('404 not found')).toBeInTheDocument();
    });
    it('renders Home', () => {
        setup();
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});