import BasicTable from './Table';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('axios');

const mockGetProducts = () => {
    axios.get.mockImplementation(() => {
        return Promise.resolve({
            data: [{
                name: 'Product Name 1',
                price: 120,
                store: 'SM Manila',
                category: 'Category',
                subCategory: 'Sub Category',
                link: 'http://product-link/1',
                datePurchased: '2023-04-21',
            }],
        });
    });
}

// see reference: https://kentcdodds.com/blog/avoid-nesting-when-youre-testing
const setup = () => {
    const utils = render(<BasicTable />);
    const getColumnHeader = name => screen.getByRole('columnheader', { name });
    const getColumnCell = name => screen.getByRole('cell', { name });
    return {
        ...utils,
        getColumnHeader,
        getColumnCell,
    };
};

describe('<BasicTable /> component', () => {
    let utils;
    beforeEach(() => {
        mockGetProducts();
        (utils = setup());
    });
    it('should render the table', () => {
        expect(screen.getByRole('table')).toBeInTheDocument();
    });
    it.each([
        'Name', 'Price', 'Store', 'Category', 'Sub Category', 'Reference', 'Date Purchased',
    ])('renders %s header', (headerName) => {
        expect(utils.getColumnHeader(headerName)).toBeInTheDocument();
    });
    it.each([
        'Product Name 1',
        '120',
        'SM Manila',
        'Category',
        'Sub Category',
        'http://product-link/1',
        '2023-04-21',
    ])('render table value - %s', async (cell) => {
        await waitFor(() => {
            expect(utils.getColumnCell(cell)).toBeInTheDocument();
        });
    })
});