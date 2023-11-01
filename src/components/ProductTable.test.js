import BasicTable from './ProductTable';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import csvHelper from '../helpers/csvHelper';
import * as useProducts from '../hooks/useProducts';

const mockUseProducts = () => {
    jest.spyOn(useProducts, 'default').mockReturnValue({
        products: [{
            name: 'Product Name 1',
            price: 120,
            store: 'SM Manila',
            category: 'Category',
            subCategory: 'Sub Category',
            link: 'http://product-link/1',
            datePurchased: '2023-04-21',
        }],
    });
}

const mockResolvedGetCsvFileData = () => {
    jest.spyOn(csvHelper, 'getCsvFileData')
        .mockResolvedValueOnce([
            ['Name', 'Price', 'Description'],
            ['Product1', '201', 'test'],
        ]);
}

// see reference: https://kentcdodds.com/blog/avoid-nesting-when-youre-testing
const setup = () => {
    const utils = render(<BasicTable />);
    const getColumnHeader = name => screen.getByRole('columnheader', { name });
    const getColumnCell = name => screen.getByRole('cell', { name });
    const getUploadCsv = () => screen.getByTestId('upload-csv-button');
    const queryModal = () => screen.getByTestId('upload-csv-modal')
    return {
        ...utils,
        getColumnHeader,
        getColumnCell,
        getUploadCsv,
        queryModal,
    };
};

describe('<ProductTable /> component', () => {
    let utils;
    beforeEach(() => {
        mockUseProducts();
        mockResolvedGetCsvFileData();
        (utils = setup());
    });
    it('should render the table', async () => {
        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
    });
    it.each([
        'Name', 'Price', 'Store', 'Category', 'Sub Category', 'Reference', 'Date Purchased',
    ])('renders %s header', async (headerName) => {
        await waitFor(() => {
            expect(utils.getColumnHeader(headerName)).toBeInTheDocument();
        });
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
    });
    it('should render upload csv button', () => {
        expect(screen.getByTestId('upload-csv-button')).toBeInTheDocument();
    });
    describe('modal', () => {
        describe('when file is uploaded', () => {
            it('opens the modal', async () => {
                const file = new File(['(⌐□_□)'], 'chucknorris.csv', { type: 'text/csv' });
                fireEvent.change(utils.getUploadCsv(), {
                    target: { files: [file] },
                });
                expect(utils.getUploadCsv()).toBeInTheDocument()
                await waitFor(() => {
                    expect(utils.queryModal()).toBeInTheDocument();
                });
            });
        });
    });
});