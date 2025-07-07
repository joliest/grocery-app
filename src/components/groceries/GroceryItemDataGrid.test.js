import {render, screen, waitFor} from '@testing-library/react';
import GroceryItemDataGrid from './GroceryItemDataGrid';

const SAMPLE_LIST = [
    {
        id: 1,
        quantity: 1,
        notes: 'Notes 1',
        actualPrice: 100,
        estimatedPrice: 0,
        product: {
            id: 1,
            name: 'Monterey Pork Saute - 1kg',
            category: 'Food',
            subcategory: 'Meat',
        },
        store: {
            id: 1,
            name: 'Waltermart Supermarket (San Agustin)',
            description: null,
        }
    }
]
const setup = (props = {}, state = {}) => {
    // mocks
    const initialProps = {
        list: SAMPLE_LIST,
        ...props,
    }

    // render
    const utils = render(<GroceryItemDataGrid {...initialProps} />);

    // useful functions
    const getColumnHeader = name => screen.getByRole('columnheader', { name });
    const getColumnCell = name => screen.getByRole('gridcell', { name });

    return {
        ...utils,
        getColumnHeader,
        getColumnCell,
    }
}

describe('<GroceryItemDataGrid />', () => {
    let utils;
    it.each([
        'ID', 'Product Name', 'Category', 'Recent price', 'Subcategory', 'Store name',
    ])('renders "%s" header', (headerName) => {
        (utils = setup());
        expect(utils.getColumnHeader(headerName)).toBeInTheDocument();
    });
    it.each([
        '1',
        'Monterey Pork Saute - 1kg',
        'Food',
        '₱100',
        'Meat',
        'Waltermart Supermarket (San Agustin)',
    ])('render table value - "%s"', async (cell) => {
        (utils = setup());
        await waitFor(() => {
            expect(utils.getColumnCell(cell)).toBeInTheDocument();
        });
    });
})