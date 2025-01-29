import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import DefaultLayout from './DefaultLayout';

// Fix for: Uncaught TypeError: Cannot destructure property 'basename' of 'React2.useContext(...)'
// https://stackoverflow.com/a/75728680
const TestableDefaultLayout = (props) => (
    <BrowserRouter>
        <DefaultLayout {...props} />
    </BrowserRouter>
);

const TestChildComponent = () => <div data-testid="test-child-component" />;

it('renders child component', () => {
    render(
        <TestableDefaultLayout>
            <TestChildComponent />
        </TestableDefaultLayout>
    );
    expect(screen.getByTestId('test-child-component')).toBeInTheDocument();
});
