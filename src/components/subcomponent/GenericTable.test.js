import GenericTable from './GenericTable';
import {render, screen, waitFor} from '@testing-library/react';

const props = {
    data: [
        ['Name', 'Price', 'Description'],
        ['Product1', '201', 'test'],
    ],
}

const setup = () => {
    const utils = render(<GenericTable {...props} />);
    const getColumnHeader = name => screen.getByRole('columnheader', { name });
    const getColumnCell = name => screen.getByRole('cell', { name });
    return {
        ...utils,
        getColumnHeader,
        getColumnCell,
    }
}

describe('<GenericTable />', () => {
    let utils;
    beforeEach(() => {
        (utils = setup());
    });
    it.each([
        'Name', 'Price', 'Description',
    ])('renders %s header', async (headerName) => {
        await waitFor(() => {
            expect(utils.getColumnHeader(headerName)).toBeInTheDocument();
        });
    });
    it.each([
        'Product1', '201', 'test',
    ])('render table value - %s', async (cell) => {
        await waitFor(() => {
            expect(utils.getColumnCell(cell)).toBeInTheDocument();
        });
    });
})