import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

// Fix for: Uncaught TypeError: Cannot destructure property 'basename' of 'React2.useContext(...)'
// https://stackoverflow.com/a/75728680
const TestableApp = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

it('renders default layout', () => {
  render(<TestableApp />);
  const mainContainer = screen.getByTestId('default-layout');
  expect(mainContainer).toBeInTheDocument();
});
